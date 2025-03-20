import React from "react";

export default function Button({
    children, // The content inside the button (text or icon).
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props //Allows passing extra attributes like onClick, disabled, etc.
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}> 
            {children}
        </button>  // back tick is used for classname to convert to js
    );
}
