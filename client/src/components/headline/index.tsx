import React from 'react'
import styles from './index.module.scss'
import { Fs18Fw400, H1SemiboldFs38 } from 'components/typography'

interface Props {
    title: string
    description?: string
    className?: string
}

export const HeaderPage = ({ title, description, className }: Props) => {
    return (
        <div className={`${styles.header} ${className} `}>
            <H1SemiboldFs38>{title}</H1SemiboldFs38>
            {description && <Fs18Fw400.span className={styles.description}>{description}</Fs18Fw400.span>}
        </div>
    )
}