import { Link, Navigate, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import logo from 'assets/images/Logo54.png'
import { Fs18Fw400, Fs18Fw400Black } from 'components/typography'
import { ButtonPrimary, ButtonSecondary } from 'ui/buttons'

export const Footer = () => {
    return (
        <footer>
            <div className={styles.info}></div>
            <hr />
            <Fs18Fw400.span className={styles.copyright}>© 2023 Skillbridge. All rights reserved.</Fs18Fw400.span>
        </footer>
    )
}