import React from "react";
import styles from './index.module.scss'
import { Fs18Fw400, Fs48Fw600Black } from "components/typography";

interface Props {
    title: string
    subtitle: string
    children: React.ReactNode
}

export const AuthForm = ({ title, subtitle, children }: Props) => {
    return(
        <div className={styles.authForm}>
            <div className={styles.title}>
                <Fs48Fw600Black.h1>{title}</Fs48Fw600Black.h1>
                <Fs18Fw400.h2>{subtitle}</Fs18Fw400.h2>
            </div>
            <div className={styles.form}>
                {children}
            </div>
        </div>
    )
};