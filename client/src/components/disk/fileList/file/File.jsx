import React from 'react';
import s from './File.module.css'
import dirLogo from '../../../../assets/img/dir.png'
import fileLogo from '../../../../assets/img/file.png'
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state => state.files.view)


    function openDirHandler() {
        if(file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    function downloadClickHandler(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }
    if (fileView === 'list') {
        return (
            <div className={s.file} onClick={() => openDirHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className={s.file_img}/>
                <div className={s.file_name}>{file.name}</div>
                <div className={s.file_date}>{file.date.slice(0, 10)}</div>
                <div className={s.file_size}>{sizeFormat(file.size)}</div>
                {file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)} className={`${s.file_btn} ${s.file_download}`}>Download</button>}
                <button onClick={(e) => deleteClickHandler(e)} className={`${s.file_btn} ${s.file_delete}`}>Delete</button>
            </div>
        );
    }

    if (fileView === 'plate') {
        return (
            <div className={s.file_plate} onClick={() => openDirHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className={s.file_plate_img}/>
                <div className={s.file_plate_name}>{file.name}</div>
                <div className={s.file_plate_btn}>
                    {file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)} className={`${s.file_plate_btn} ${s.file_plate_download}`}>Download</button>}
                    <button onClick={(e) => deleteClickHandler(e)} className={`${s.file_plate_btn} ${s.file_plate_delete}`}>Delete</button>
                </div>

            </div>
        );
    }
};

export default File;