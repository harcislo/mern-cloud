import React, {useState} from 'react';
import s from './Popup.module.css'
import Input from "../../../utils/input/Input";
import {useDispatch, useSelector} from "react-redux";
import {removePopup} from "../../../reducers/fileReducer";
import {createDir} from "../../../actions/file";

const Popup = () => {
    const [dirName, setDirName] = useState('')
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)


    function createHandler() {
        dispatch(createDir(currentDir, dirName))
        setDirName('')
        dispatch(removePopup)
    }

    return (
        <div className={s.popup} onClick={() => dispatch(removePopup)}>
            <div className={s.content} onClick={(event) => event.stopPropagation()}>
                <div className={s.header}>
                    <div className={s.title}>Создать новую папку</div>
                    <button className={s.close} onClick={() => dispatch(removePopup)}>X</button>
                </div>
                <Input type={'text'} placeholder={'Введите название папки'} value={dirName} setValue={setDirName}/>
                <button className={s.create} onClick={() => createHandler()}>Создать</button>
            </div>
        </div>
    );
};

export default Popup;