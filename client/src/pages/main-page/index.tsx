import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { useQuery } from 'react-query'
import { getLogs } from 'api'
import { getNormalDate } from 'utils/normalDate'
import { Link } from 'react-router-dom'
import Marquee from "react-fast-marquee"

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
    )
}
