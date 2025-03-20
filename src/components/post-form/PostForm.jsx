import React, { useCallback } from "react"; //useCallback → Memoizes the slug transformation function
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; //Fetches authentication data from Redux

export default function PostForm({ post }) { // post prop contains existing post data (if updating)
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({ //useForm initializes the form with default values (if editing an existing post)
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post && post.$id) { // updating image
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);  //// Delete old image
            }

            const dbPost = await appwriteService.updatePost(post.$id, { // update
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);  // Redirect to updated post
            }
        } else { // Creating a new post
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`); // Redirect to new post
                }
            }
        }
    };

    const slugTransform = useCallback((value) => { 
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-") // Replace special characters with "-"
                .replace(/\s/g, "-");  // Replace spaces with "-"

        return "";
    }, []);

    // watch is a function provided by react-hook-form that listens for changes in the form fields. When a field's value updates, watch triggers a callback and provides:
    // value → The entire form's current state (all field values).
    // name → The name of the specific field that was just updated.

    React.useEffect(() => {
        const subscription = watch((value, { name }) => { //watch((value, { name }) => { ... }) monitors form field changes
            if (name === "title") { //Ensures we only react when the title field changes
                setValue("slug", slugTransform(value.title), { shouldValidate: true }); //Calls slugTransform(value.title) to create a slug from the title && Uses setValue("slug", transformedSlug, { shouldValidate: true }) to update the slug field
                //shouldValidate: true ensures React Hook Form checks the new slug
            }
        });

        return () => subscription.unsubscribe();//imp**  -Prevents memory leaks
        //Removes the watcher when the component unmounts
        //In React, a component mounts when it is first added to the DOM and unmounts when it is removed from the DOM.
        //This ensures that watch stops listening for updates when the component is removed from the UI.
    }, [watch, slugTransform, setValue]);
    // Watches the title field
    // Automatically updates the slug field when the title changes
    // Ensures validation with shouldValidate: true

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}// watch() function is able to detect changes in form fields because of ...register.
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}