import React from 'react';

export default ({name, value, type, caption, onChange, error, className})=>{
    return(
        <fieldset>
            <legend htmlFor={name} className="main-color">{caption}</legend>
            <br/>
            <input type={type||"text"} name={name} 
            id={name} value={value} className={error ? className+' error': className}
            onChange={(onChange || ((e)=>false))}
            />
            <br/>
            <br/>
            {(error && true) ? (<span className="center orange">{error}</span>) : null}
        </fieldset>
    );
}