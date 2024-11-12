import { getTests } from 'api'
import { H1SemiboldFs38 } from 'components/typography'
import React from 'react'
import { useQuery } from 'react-query'
import styles from './index.module.scss'
import { TestCard } from 'components/test-card'
import { useLocation, useNavigate } from 'react-router-dom'
import { ITest } from 'interfaces'

export const DisplayTests = () => {
    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ['get-all-tests'],
        queryFn: getTests,
        keepPreviousData: true
    })
    console.log(data);
    

    const navigateEdit = (el: ITest) => {
        navigate('/admin-panel/create-test', {
            state: el
        })
    }

    return (
        <div className={styles.wrapper}>
            <H1SemiboldFs38>Тесты</H1SemiboldFs38>
            <div className={styles.items}>
                {
                    data?.map(el => (
                        <div key={el.id} onClick={() => navigateEdit(el)}>
                            <TestCard test={el} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
