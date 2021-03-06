import React, {useEffect, useState} from 'react';
import s from './Disk.module.css'
import {useDispatch, useSelector} from "react-redux";
import {createDir, getFiles, uploadFile} from "../../actions/file";
import FileList from "./fileList/FileList";
import Popup from "./Popup/Popup";
import {setCurrentDir, setFileAction, setPopup} from "../../reducers/fileReducer";
import Uploader from "../uploader/Uploader";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const popupDisplayType = useSelector(state => state.files.popupDisplay)
    const dirStack = useSelector(state => state.files.dirStack)
    const loader = useSelector(state => state.app.loader)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

    function showPopupHandler() {
        dispatch(setPopup)
    }

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }
    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }


    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        console.log(files)
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)

    }

    if(loader) {
        return <div className={s.loader}>
            <div className={s.gooey}>
                <span className={s.dot}/>
                <div className={s.dots}>
                    <span/>
                    <span/>
                    <span/>
                </div>
            </div>
        </div>
    }

    return (!dragEnter ? <div className={s.disk} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className={s.header_wrapper}>


                <div className={s.disk_btn}>
                    <button className={s.disk_back} onClick={() => backClickHandler()}>??????????</button>
                    <button className={s.disk_create} onClick={() => showPopupHandler()}>??????????????</button>
                    <div className={s.upload}>
                        <label className={s.upload_label} htmlFor="disk_upload_input">?????????????????? ????????</label>
                        <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file"
                               className={s.upload_input} id={'disk_upload_input'}/>
                    </div>
                </div>

                    <div className={s.options}>
                        <select value={sort} onChange={(e) => setSort(e.target.value)} className={s.select}>
                            <option value={'name'}>???? ??????????</option>
                            <option value={'type'}>???? ????????</option>
                            <option value={'date'}>???? ????????</option>
                        </select>

                        <button className={s.plate} onClick={() => dispatch(setFileAction('plate'))}>????????????</button>
                        <button className={s.list} onClick={() => dispatch(setFileAction('list'))}>????????????</button>
                    </div>
            </div>

                <FileList/>
                {popupDisplayType &&
                <Popup/>
                }
                <Uploader/>
            </div>
            : <div className={s.drop_area} onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                ???????????????????? ?????????? ????????
            </div>
    );
};

export default Disk;