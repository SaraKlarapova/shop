import React from 'react'
import styles from './index.module.scss'
import { H1SemiboldFs38 } from 'components/typography'
import { useQuery } from 'react-query'
import { passedCourses } from 'api'
import { Card } from 'components/card'

export const PassedCourses = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['passed-courses'],
        queryFn: () => passedCourses(),
        keepPreviousData: true
    })

    return (
        <div className={styles.wrapper}>
            <H1SemiboldFs38>Пройденные курсы</H1SemiboldFs38>

            <div className={styles.body}>
                {data?.map(el => (
                    <Card isPassed item={el} />
                ))}
            </div>

        </div>
    )
}
