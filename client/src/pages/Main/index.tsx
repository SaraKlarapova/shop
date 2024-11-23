import { Button } from "ui/buttons";
import styles from './index.module.scss'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { SignUp } from "./signup";
import { SignIn } from "./signin";
import { useJwtStore } from "stores/jwt";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

export const Main = () => {

    const navigate = useNavigate()
    const jwt = useJwtStore((state) => state.role);

    useEffect(() => {
        if (jwt) {
            navigate('/panel')
        } else {
            navigate('/auth/sign-in')
        }
    }, [jwt])

    return (
        <>
        <Helmet>
          <title>SkillSync</title>
          <meta name="description" content="SkillSync - платформа обучения" />
          <meta name="keywords" content="SkillSync, обучение, Skill Sync, платформа, платформа обучения, программирование" />

          <meta property="og:title" content="SkillSync - платформа обучения" />
          <meta property="og:description" content="SkillSync - это платформа для обучения программированию" />
          <meta property="og:image" content="https://n-shop.storage.yandexcloud.net/n-shop/1732381367478" />
          <meta property="og:url" content="http://localhost:3001" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="SkillSync" />
          <meta name="twitter:description" content="SkillSync - это платформа для обучения программированию" />
          <meta name="twitter:image" content="https://n-shop.storage.yandexcloud.net/n-shop/1732381367478" />
        </Helmet>
            <main className={styles.wrapper}>
                <div className={styles.leftBlock}>
                    <div className={styles.logo}>SkillSync</div>
                </div>
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

