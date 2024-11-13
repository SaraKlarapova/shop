import { Link, Navigate, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import logo from 'assets/images/Logo54.png'
import { Fs18Fw400, Fs18Fw400Black } from 'components/typography'
import { ButtonPrimary, ButtonSecondary } from 'ui/buttons'

export const Header = () => {

    const isAuthed = true
    const name = 'Alice'
    const surname = 'White'
    const avatar = logo

    const navigate = useNavigate()

    return (
        <header className={styles.header}>
            <nav className={styles.navigate}>
                <img src={logo} />
                <div className={styles.links}>
                    <Link to={''} className={styles.navLink}>
                        <Fs18Fw400.span>Главная</Fs18Fw400.span>
                    </Link>
                    <Link to={'/all-courses'} className={styles.navLink}>
                        <Fs18Fw400.span>Курсы</Fs18Fw400.span>
                    </Link>
                    <Link to={''} className={styles.navLink}>
                        <Fs18Fw400.span>О нас</Fs18Fw400.span>
                    </Link>
                    <Link to={''} className={styles.navLink}>
                        <Fs18Fw400.span>Контакты</Fs18Fw400.span>
                    </Link>
                </div>
            </nav>
            {isAuthed ? 
                <div className={styles.profile} onClick={() => navigate('/profile')}>
                    <img src={avatar} alt='' />
                    <div className={styles.name}>
                        <Fs18Fw400.span>{name}</Fs18Fw400.span>
                        <Fs18Fw400.span>{surname}</Fs18Fw400.span>
                    </div>
                </div>
                :
                <div className={styles.sign}>
                    <ButtonSecondary>Регистрация</ButtonSecondary>
                    <ButtonPrimary>Вход</ButtonPrimary>
                </div>
            }
        </header>
    )
}