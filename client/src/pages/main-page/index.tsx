import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { useQuery } from 'react-query'
import { getLogs } from 'api'
import { getNormalDate } from 'utils/normalDate'
import { Link } from 'react-router-dom'
import Marquee from "react-fast-marquee"
import { Fs18Fw400Black, Fs38Fw600Black, H1SemiboldFs38 } from 'components/typography'
import { Helmet } from 'react-helmet'

export const MainScreen = () => {

    const marqueeRef = useRef(null);
    const [animationDuration, setAnimationDuration] = useState(0);

    const SPEED = 100; // pixels per second
    
    const { data, isLoading } = useQuery({
        queryKey: ['get-logs'],
        queryFn: () => getLogs(),
        keepPreviousData: true
    })

    useEffect(() => {
        if (marqueeRef.current) {
            const marqueeWidth = (marqueeRef as any)?.current?.scrollWidth;
            const duration = marqueeWidth / SPEED; // duration in seconds
            setAnimationDuration(duration);
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>; // Customize your loading state as needed
    }

    const marqueeItems = data && [...data, ...data]

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
        <div
            className={styles.marquee}
            ref={marqueeRef}
            style={{
                animationDuration: `${animationDuration}s`,
            }}
        >
            {marqueeItems?.map((el, index) => (
                <div key={index}>{el.type === 'ADD' ? 'Добавлен курс' : 'Изменен курс'} <Link to={`course/${el.Course.id}`}>{el.Course.headline}</Link></div>
            ))}
        </div>
        <div className={styles.wrap}>
            <div className={styles.content}>
                <H1SemiboldFs38>День рождения организации:</H1SemiboldFs38>
                <Fs18Fw400Black.p>12.12.2022</Fs18Fw400Black.p>
            </div>
            <div className={styles.content}>
                <H1SemiboldFs38>Cоздание сайта:</H1SemiboldFs38>
                <Fs18Fw400Black.p>Придумали темку</Fs18Fw400Black.p>
                <Fs18Fw400Black.p>Написали дизайн</Fs18Fw400Black.p>
                <Fs18Fw400Black.p>жоско сверстали</Fs18Fw400Black.p>
                <Fs18Fw400Black.p>ну и все ура!</Fs18Fw400Black.p>
            </div>
            <div className={styles.content}>
                <H1SemiboldFs38>Праздники организации:</H1SemiboldFs38>
                <Fs18Fw400Black.p>Мы отмечаем новый год</Fs18Fw400Black.p>
                <Fs18Fw400Black.p>и 9 мая</Fs18Fw400Black.p>
                <Fs18Fw400Black.p>и 8 марта девчульки любимые ура</Fs18Fw400Black.p>
            </div>
        </div>
        </>
    )
}
