import { Button } from "ui/buttons";
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
                <div className={styles.rightBlock}>
                    <div className={styles.block}>
                        <div className={styles.auth}>
                            <Routes>
                                <Route path={"/sign-in"} element={<SignIn />}></Route>
                                <Route path={"/sign-up"} element={<SignUp />}></Route>
                            </Routes>
                        </div>

                        <div className={styles.footer}>
                            <div className={styles.item}>
                                Privacy Policy
                            </div>
                            <div className={styles.item}>
                                Terms
                            </div>
                            <div className={styles.item}>
                                © 2024 Bauer CRM.
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}

