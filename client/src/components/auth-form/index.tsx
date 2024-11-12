import React from "react";
import styles from './index.module.scss'
import { Fs12Fw400Black, Fs18Fw400Black } from "components/typography";

interface Props {
    title: string
    subtitle: string
    children: React.ReactNode
}

export const AuthForm = ({ title, subtitle, children }: Props) => {
    return(
        <>
            <Fs18Fw400Black.h1>{title}</Fs18Fw400Black.h1>
            <Fs12Fw400Black.h2>{subtitle}</Fs12Fw400Black.h2>
            <div className={styles.authForm}>
                {children}
            </div>
        </>
    )
};