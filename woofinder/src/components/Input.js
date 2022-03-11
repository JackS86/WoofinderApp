import "./input.css"


import { useState } from "react";






export const FormInput = (props) => {




    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps }
        = props;


    const handleFocus = (e) => {
        setFocused(true);

    };







    return (
        <div className='formInput'>
            <input {...inputProps}
                onChange={onChange} required
                onBlur={handleFocus}
                focused={focused.toString()}
            />
            <span className="error">{errorMessage}</span>
        </div>
    )
}


