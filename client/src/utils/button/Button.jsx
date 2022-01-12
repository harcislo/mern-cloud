import s from './button.module.css'

import React from 'react';
import {useDispatch} from "react-redux";

const Button = (props) => {
    const dispatch = useDispatch()

    return (
        <button className={s.button} onClick={() => dispatch(props.action(props.data.email, props.data.password))}>{props.text}</button>
    );
};

export default Button;