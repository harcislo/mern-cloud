import React from 'react';
import s from './FileList.module.css'
import {useSelector} from "react-redux";
import File from "./file/File";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const FileList = () => {
    const files = useSelector(state => state.files.files)
    const fileView = useSelector(state => state.files.view)

    if(files.length === 0) {
        return <div className={s.notFound}>
            <span>Файлы не найдены...</span>
        </div>
    }

    if(fileView === 'plate') {
        return <div className={s.filePlate}>
                    {files.map(file =>
                            <File key={file._id} file={file}/>
                    )}
        </div>
    }

    if(fileView === 'list') {
        return (
            <div className={s.fileList}>
                <div className={s.fileList_header}>
                    <div className={s.fileList_name}>Название</div>
                    <div className={s.fileList_date}>Дата</div>
                    <div className={s.fileList_size}>Размер</div>
                </div>
                <div className={s.files}>
                    <TransitionGroup>
                        {files.map(file =>
                            <CSSTransition key={file._id}
                                           timeout={500}
                                           classNames={'file'}
                                           exit={false}>
                                <File file={file}/>
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
            </div>
        );
    }

    return (
        <div className={s.fileList}>
            <div className={s.fileList_header}>
                <div className={s.fileList_name}>Название</div>
                <div className={s.fileList_date}>Дата</div>
                <div className={s.fileList_size}>Размер</div>
            </div>
            <div className={s.files}>
                <TransitionGroup>
                    {files.map(file =>
                        <CSSTransition key={file._id}
                                       timeout={500}
                                       classNames={'file'}
                                       exit={false}>
                            <File file={file}/>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
        </div>
    );
};

export default FileList;