import React, {useId} from 'react'

function Select({
    options, // An array of values for dropdown options.
    label,  // The text for the <label> associated with the dropdown.
    className,
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option> //The options array is mapped to <option> elements dynamically.
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)