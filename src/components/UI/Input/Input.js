import React from 'react'

import './Input.css'

export default function Input(props) {
    let type = props.type || 'text';
    const htmlFor = `${props.type} + ${Math.random()}`;

    return (
        <div className='input-form'>
           <label htmlFor={htmlFor}>{props.label}</label> 
            <input 
                placeholder={props.placeholder ? props.placeholder : ""} 
                type={type} 
                value={props.value} 
                name={props.name}
                id={htmlFor}
                onChange={props.onChange} 
            />
        </div>
    )
}
