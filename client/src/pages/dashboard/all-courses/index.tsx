import { getCourse } from 'api'
import React from 'react'
import { useQuery } from 'react-query'
import styles from './index.module.scss'
import { Card } from 'components/card'
import { H1SemiboldFs38 } from 'components/typography'

export const AllCourses = () => {

  const { data, isLoading } = useQuery({
    queryKey: ['get-course'],
    queryFn: () => getCourse(),
    keepPreviousData: true
  })

  return (
    <div className={styles.wrapper}>
      <H1SemiboldFs38>Все курсы</H1SemiboldFs38>
        <div className={styles.items}>
          {data?.map(el => (
            <Card item={el} />
          ))}
        </div>
    </div>
  )
}
