import React, {useState} from 'react';
import s from './Login.module.css'
import Input from "../../utils/input/Input";
import Button from "../../utils/button/Button";
import {login} from "../../actions/user";
import {useDispatch} from "react-redux";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className={s.wrapper}>
            <div className={s.header}>Авторизация</div>
            <Input value={email} setValue={setEmail} type={'text'} placeholder={'Введите email'}/>
            <Input value={password} setValue={setPassword} type={'password'} placeholder={'Введите пароль'}/>
            <Button data={{email, password}} action={login} text={'Войти'}/>
        </div>
    );
};

export default Login;