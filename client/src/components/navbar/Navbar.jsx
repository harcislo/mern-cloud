import React, {useState} from 'react';
import s from './Navbar.module.css'
import Logo from '../../assets/img/logo.png'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {setFiles} from "../../reducers/fileReducer";
import {getFiles, searchFiles} from "../../actions/file";
import {showLoader} from "../../reducers/appReducer";
import avatarLogo from '../../assets/img/avatar.png'
import {API_URL} from "../../config";

export default () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)

    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

    function searchHandler(e) {
        setSearchName(e.target.value)
        if(searchTimeout) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if(e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value))
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }


    }

    return (
        <>
            <div className={s.navbar}>
                <div className={s.wrapper}>

                    <NavLink to={'/'}><img className={s.logo} src={Logo} alt=""/></NavLink>
                    {isAuth && <input className={s.search}
                                      type="text"
                                      placeholder={'Название файла...'}
                                      value={searchName}
                                      onChange={(e) => searchHandler(e)}
                    />}
                    <div className={s.auth}>
                        {!isAuth &&
                        <div  className={s.login}>
                            <NavLink to={'/login'} className={({isActive}) => isActive ? s.navbarActive : ''}>войти</NavLink>
                        </div>
                        }
                        {!isAuth &&
                        <div className={s.registration}>
                            <NavLink to={'/registration'} className={({isActive}) => isActive ? s.navbarActive : ''}>регистрация</NavLink>
                        </div>
                        }
                        {isAuth &&
                        <div className={s.logout} onClick={() => dispatch(logout())}>
                           выйти
                        </div>
                        }
                        {isAuth && <NavLink to={'/profile'}><img className={s.avatar} src={avatar} alt=""/></NavLink>}
                    </div>
                </div>
            </div>
        </>
    );
};