import React from 'react';
import s from './Profile.module.css'
import {useDispatch} from "react-redux";
import {deleteFile} from "../../actions/file";
import {deleteAvatar, uploadAvatar} from "../../actions/user";

const Profile = () => {
    const dispatch = useDispatch()

    function changeHandler(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <div className={s.wrapper}>
            <button className={s.button} onClick={() => dispatch(deleteAvatar())}>Удалить аватар</button>
            <input className={s.input} accept={'image/*'} onChange={e => changeHandler(e)} type={'file'} placeholder={'Загрузть аватар'}/>
        </div>
    );
};

export default Profile;