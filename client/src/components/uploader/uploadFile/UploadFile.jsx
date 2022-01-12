import React from 'react';
import s from './Upload.module.css'
import {useDispatch} from "react-redux";
import {removeUploadFile} from "../../../reducers/uploadReducer";

const UploadFile = ({file}) => {
    const dispatch = useDispatch()
    return (
        <div className={s.file}>
            <div className={s.header}>
                <div className={s.name}>{file.name}</div>
                <button onClick={() => dispatch(removeUploadFile(file.id))} className={s.remove}>X</button>
            </div>
            <div className={s.progress_bar}>
                <div style={{width: file.progress+'%'}} className={s.upload_bar}></div>
                <div className={s.percent}>
                    {file.progress}%
                </div>
            </div>
        </div>
    );
};

export default UploadFile;