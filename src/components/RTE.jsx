// The RTE component (Rich Text Editor) is a custom wrapper around TinyMCE's text editor. It integrates with React Hook Form to handle form-controlled inputs.
import React from 'react'
import {Editor } from '@tinymce/tinymce-react'; //Provides a full-featured rich text editor
import {Controller } from 'react-hook-form'; // Connects TinyMCE's editor with form validation


export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller               //Uses Controller to manage TinyMCE's input state in React Hook Form
    name={name || "content"}  //Uses name if provided, otherwise defaults to "content"
    control={control}  //control is passed from React Hook Form
    render={({field: {onChange}}) => ( //The render function receives an object containing field props, including:
        // onChange → Function to update the form state
        
        <Editor
        apiKey="gmp4ch0u50h7z4k0ocyi3b4jjvm9q7vsatqlytnmhlrv1z5b" 
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )//Controller connects TinyMCE to the form
    //The editor's changes are tracked in React Hook Form
}
