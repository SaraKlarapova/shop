import React, { useMemo } from "react";
import styles from './index.module.scss'
import { ICourse } from "interfaces";
import { PopUpVisibleCourse } from "admin-panel/course";
import { useQuery } from "react-query";
import { getCountOfMembers } from "api";

interface Props {
    isVisible: PopUpVisibleCourse
    setIsVisible: React.Dispatch<React.SetStateAction<PopUpVisibleCourse>>
    item: ICourse
}

export const CardAdmin = ({ item, isVisible, setIsVisible }: Props) => {

    const { data, isLoading } = useQuery({
        queryKey: ['get-count-of-members', item.id],
        queryFn: () => getCountOfMembers(item.id),
        keepPreviousData: true
    })

    const time = useMemo(() => {
        if (item.minutes < 10 || item.minutes > 20) {
            if (item.minutes % 10 === 1) {
                return 'минута'
            } else if (item.minutes % 10 > 1 && item.minutes % 10 < 5) {
                return 'минуты'
            } else {
                return 'минут'
            }
        } else {
            return 'минут'
        }
    }, [item])

    const members = useMemo(() => {
        if (!data) return

        if (data < 10 || data > 20) {
            if (data % 10 === 1) {
                return 'участник'
            } else if (data % 10 > 1 && data % 10 < 5) {
                return 'участника'
            } else {
                return 'участников'
            }
        } else {
            return 'участников'
        }
    }, [data])

    return (
        <div className={styles.card} onClick={() => setIsVisible({
            visibility: true,
            data: item,
        })}>
            <img className={styles.img} src={item.image} alt={item.headline} />
            {/* <div className={styles.img} /> */}
            <div className={styles.text}>
                <div className={styles.header}>
                    <span className={styles.gray}>{data} {members}</span>
                    {item.minutes > 0 && <span className={styles.gray}>{item.minutes} {time}</span>}
                </div>
                <h2 className={styles.title}>{item.headline}</h2>
                <span className={styles.author}>{item.Users.name}</span>
            </div>
        </div>
    )
}