import React from 'react'
import styles from './index.module.scss'
import { useQuery } from 'react-query'
import { getLogs } from 'api'
import { getNormalDate } from 'utils/normalDate'
import { Link } from 'react-router-dom'

export const MainScreen = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['get-logs'],
        queryFn: () => getLogs(),
        keepPreviousData: true
    })

    return (
        <div>
            {data?.map(el => (
                <div>{getNormalDate(el.createdAt)} {el.type === 'ADD' ? 'Добавлен курс' : 'Изменен курс'} <Link to={`course/${el.Course.id}`}>{el.Course.headline}</Link></div>
            ))}
        </div>
    )
}
