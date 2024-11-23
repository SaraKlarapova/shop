import React from "react";
import styles from './index.module.scss'
import { Fs16Fw400, H1SemiboldFs38 } from "components/typography";
import { MapWithMarker } from "./components/map";
import { Helmet } from "react-helmet";

export const Contacts = () => {
    return (
        <div className={styles.wrapper}>
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
            <div className={styles.card}>
                <H1SemiboldFs38>Адреса</H1SemiboldFs38>
                <div className={styles.items}>
                    <Fs16Fw400.span>Юридический адрес: 428031, Чувашия, Чебоксары, пр. Тракторостроителей, 4</Fs16Fw400.span>
                    <Fs16Fw400.span>Фактический адрес: 428031, Чувашия, Чебоксары, Ул. Константина Иванова, 10</Fs16Fw400.span>
                </div>
            </div>
            <div className={styles.card}>
                <H1SemiboldFs38>Номера телефонов</H1SemiboldFs38>
                <div className={styles.items}>
                    <Fs16Fw400.span>+7 (495) 123-45-67</Fs16Fw400.span>
                    <Fs16Fw400.span>+7 (495) 123-45-68</Fs16Fw400.span>
                </div>
            </div>
            <div className={styles.map}>
                <MapWithMarker />
            </div>
        </div>
    )
}