import { ITest } from 'interfaces'
import React from 'react'
import styles from './index.module.scss'
import { Fs14Fw400, Fs18Fw500 } from 'components/typography'
import { getNormalDate } from 'utils/normalDate'

interface Props {
    test: ITest
}

export const TestCard = ({ test }: Props) => {
    return (
        <div className={styles.card}>
            <Fs18Fw500.span>{test.headline}</Fs18Fw500.span>
            <Fs14Fw400.span>Количество вопросов: {test.Questions.length}</Fs14Fw400.span>
            <Fs14Fw400.span>Проходной балл: {test.minimumQuestionsAnswered}</Fs14Fw400.span>
            <Fs14Fw400.span>Дата: {getNormalDate(test.createdAt)}</Fs14Fw400.span>
        </div>
    )
}
