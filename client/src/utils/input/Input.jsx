import s from './Input.module.css'

import React from 'react';

const Input = (props) => {
    return (
        <input className={s.input}
               type={props.type}
               placeholder={props.placeholder}
               value={props.value}
               onChange={event => {
                   props.setValue(event.target.value)}
               }
        />
    );
};

export default Input;