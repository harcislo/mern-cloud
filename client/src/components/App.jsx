import s from './App.module.css'
import Navbar from "./navbar/Navbar";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Registration from "./registration/Registration";
import Login from "./login/Login";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {auth} from "../actions/user";
import Disk from "./disk/Disk";
import Profile from "./profile/Profile";

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, [])

    return (
        <BrowserRouter>
            <div className={s.app}>
                <Navbar/>
            </div>
            <div className={s.content}>
                {!isAuth ?
                    <Routes>
                        <Route path={'/registration'} element={<Registration/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route
                            path="*"
                            element={<Navigate to="/login" />}
                        />
                    </Routes>
                    :
                    <Routes>
                        <Route exact path={'/'} element={<Disk/>}/>
                        <Route exact path={'/profile'} element={<Profile/>}/>
                        <Route
                            path="*"
                            element={<Navigate to="/" />}
                        />
                    </Routes>
                }
            </div>

        </BrowserRouter>
    );
}

export default App;
