import React from 'react';
import s from './Uploader.module.css'
import UploadFile from "./uploadFile/UploadFile";
import {useDispatch, useSelector} from "react-redux";
import {hideUploader} from "../../reducers/uploadReducer";

const Uploader = () => {
    const isVisible = useSelector(state => state.upload.isVisible)
    const dispatch = useDispatch()
    const files = useSelector(state => state.upload.files)


    return ( isVisible &&
        <div className={s.uploader}>
            <div className={s.header}>
               <div className={s.title}>Загрузки</div>
                <button className={s.close} onClick={() => dispatch(hideUploader())}>X</button>
            </div>
            {files.map(file => <UploadFile key={file.id} file={file}/>)}

        </div>
    );
};

export default Uploader;