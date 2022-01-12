import s from './Registration.module.css'

import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import Button from "../../utils/button/Button";
import {registration} from "../../actions/user";

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className={s.wrapper}>
            <div className={s.header}>Регистрация</div>
            <Input value={email} setValue={setEmail} type={'text'} placeholder={'Введите email'}/>
            <Input value={password} setValue={setPassword} type={'password'} placeholder={'Введите пароль'}/>
            <Button data={{email, password}} action={registration} text={'Зарегистрироваться'}/>
        </div>
    );
};

export default Registration;