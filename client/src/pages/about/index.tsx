import React from 'react'
import styles from './index.module.scss'
import { Fs16Fw400, H1SemiboldFs38 } from 'components/typography'

export const About = () => {
    return (
        <div className={styles.wrapper}>
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