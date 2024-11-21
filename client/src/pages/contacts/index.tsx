import React from "react";
import styles from './index.module.scss'
import { Fs16Fw400, H1SemiboldFs38 } from "components/typography";
import { MapWithMarker } from "./components/map";

export const Contacts = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <H1SemiboldFs38>Адреса</H1SemiboldFs38>
                <div className={styles.items}>
                    <Fs16Fw400.span>428031, Чувашия, Чебоксары, пр. Тракторостроителей, 4</Fs16Fw400.span>
                    <Fs16Fw400.span>428031, Чувашия, Чебоксары, Ул. Константина Иванова, 10</Fs16Fw400.span>
                </div>
            </div>
            <div className={styles.card}>
                <H1SemiboldFs38>Номера телефонов</H1SemiboldFs38>
                <div className={styles.items}>
                    <Fs16Fw400.span>8 (835) 254-75-90</Fs16Fw400.span>
                    <Fs16Fw400.span>8 (835) 258-80-80</Fs16Fw400.span>
                </div>
            </div>
            <div className={styles.map}>
                <MapWithMarker />
            </div>
        </div>
    )
}