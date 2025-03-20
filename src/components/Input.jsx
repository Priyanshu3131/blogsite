import React, {useId} from 'react' // generate a unique ID for the input field.

const Input = React.forwardRef( function Input({ //React.forwardRef() → Allows this component to accept a ref from a parent.
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId() //Generates a unique ID for the input field.
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}> 
            {/* Connects label to input for accessibility. */}
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} // back tick is used for classname to convert to js
            ref={ref}  // Allows access via ref from a parent.
            {...props}
            id={id}   // Ensures correct association with the label.
            />
        </div>
    )
})

export default Input