import React from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'

interface Props {
    children: React.ReactNode
    link: string
    className?: any
}

export const SocialItem = ({children, link, className}:Props) => {
    
    return (
        <a target='_blank' rel="noopener" href={link} className={`${styles.contact} ${className}`}>
            <div className={styles.icon}>
                {children}
            </div>
        </a>
    )
}