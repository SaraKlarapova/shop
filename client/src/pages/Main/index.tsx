import { ButtonPrimary } from "ui/buttons";
import styles from './index.module.scss'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { SignUp } from "./signup";
import { SignIn } from "./signin";
import { useJwtStore } from "stores/jwt";
import { useEffect } from "react";

export const Main = () => {

    const navigate = useNavigate()
    const jwt = useJwtStore((state) => state.role);

    useEffect(() => {
        if (jwt) {
            navigate('/')
        } else {
            navigate('/auth/sign-in')
        }
    }, [jwt])

    return (
        <>
            <main className={styles.wrapper}>
                <div className={styles.auth}>
                    <Routes>
                        <Route path={"/sign-in"} element={<SignIn />}></Route>
                        <Route path={"/sign-up"} element={<SignUp />}></Route>
                    </Routes>
                </div>
            </main>
        </>
    );
}

