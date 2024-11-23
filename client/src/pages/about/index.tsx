import React from 'react'
import styles from './index.module.scss'
import { Fs16Fw400, H1SemiboldFs38 } from 'components/typography'
import { Helmet } from 'react-helmet'

export const About = () => {
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
                <H1SemiboldFs38>О компании</H1SemiboldFs38>
                <div className={styles.items}>
                    <Fs16Fw400.span>ООО "Код и Радость"</Fs16Fw400.span>
                    <Fs16Fw400.span>ИНН: 1234567890</Fs16Fw400.span>
                    <Fs16Fw400.span>ОГРН: 1123456789012</Fs16Fw400.span>
                    <Fs16Fw400.span>Электронная почта: info@kodiradost.ru</Fs16Fw400.span>
                    <Fs16Fw400.span>Генеральный директор: Иванов Иван Иванович</Fs16Fw400.span>
                </div>
            </div>
            <div className={styles.card}>
                <H1SemiboldFs38>О нас</H1SemiboldFs38>
                <div className={styles.items}>
                    <Fs16Fw400.span>Компания "Код и Радость" занимается обучением и популяризацией программирования с 2022 года. Мы верим, что кодить можно не только эффективно, но и весело!</Fs16Fw400.span>
                </div>
            </div>
        </div>
    )
}