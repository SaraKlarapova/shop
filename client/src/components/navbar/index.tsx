import React, { useState } from 'react'
import styles from './index.module.scss'
import { faChevronLeft, faPenRuler, faDisplay, faMagnifyingGlassChart, IconDefinition, faHouse, faGears, faChartBar, faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, DashboardIcon, GearIcon, VercelLogoIcon } from '@radix-ui/react-icons'
import Logo from 'assets/icons/logo-dark.svg'
import BlinkSwap from 'assets/images/1yIEAIwIBOM.png'
import { useQuery } from 'react-query'
import DoorExit from 'assets/icons/door-exit.svg'
import { useJwtStore } from 'stores/jwt'

interface Props {
    children: React.ReactNode
}
interface NAV {
    title: string,
    link: string,
}
interface NAVSections {
    title: string,
    icon: IconDefinition,
    navigation: NAV[]
}
const navigation: NAVSections[] = [
    {
        title: 'Materials',
        icon: faHouse,
        navigation: [
            { title: 'Курсы', link: '/' },
        ]
    },
];

const navigationJwt: NAVSections[] = [
    {
        title: 'Пройденные материалы',
        icon: faHouse,
        navigation: [
            { title: 'Пройденные курсы', link: '/panel/passed-courses' },
            { title: "Проверить подлинность курса", link: '/panel/verify-certificate' }
        ]
    }
]

export const Navbar = ({ children }: Props) => {

    const [chosenCategory, setChosenCategory] = useState('');

    const clearAll = useJwtStore((state) => state.clearAll);

    const handleSignOut = () => {
        clearAll();
    }

    const jwt = useJwtStore((state) => state.role);
    const navigate = useNavigate()

    return (
        <div className={styles.wrapper}>
            <div className={styles.navbar}>
                <header className={styles.header}>
                    <div className={styles.logo}>
                        {/* <img src={Logo} /> */}
                        <img src={BlinkSwap} />
                        <div className={styles.description}>
                            <div className={styles.headline}>Site shop</div>
                        </div>
                    </div>
                </header>
                <div className={styles.lists}>
                    {navigation.map(el => (
                        <div key={el.title} className={styles.list}>
                            <div className={styles.hero}>
                                <FontAwesomeIcon icon={el.icon} size="sm" style={{ color: "#9fa8b7", }} className={styles.icon} />
                                <span className={styles.title}>{el.title}</span>
                            </div>
                            {el.navigation.map(navElement => (
                                <div className={styles.item} onClick={() => setChosenCategory(navElement.title)} data-isсhosen={chosenCategory === navElement.title} key={navElement.link}>
                                    <NavLink to={navElement.link} className={styles.group} >
                                        <span className={styles.text}>{navElement.title}</span>
                                    </NavLink>
                                </div>
                            ))}
                        </div>
                    ))}
                    {jwt &&
                        <>
                            {navigationJwt.map(el => (
                                <div key={el.title} className={styles.list}>
                                    <div className={styles.hero}>
                                        <FontAwesomeIcon icon={el.icon} size="sm" style={{ color: "#9fa8b7", }} className={styles.icon} />
                                        <span className={styles.title}>{el.title}</span>
                                    </div>
                                    {el.navigation.map(navElement => (
                                        <div className={styles.item} onClick={() => setChosenCategory(navElement.title)} data-isсhosen={chosenCategory === navElement.title} key={navElement.link}>
                                            <NavLink to={navElement.link} className={styles.group} >
                                                <span className={styles.text}>{navElement.title}</span>
                                            </NavLink>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <Link to="/" className={styles.exit} onClick={handleSignOut}>
                                <img src={DoorExit} />
                                <span className={styles.text}>Выйти</span>
                            </Link>
                        </>
                    }
                    {!jwt && 
                        <Link to="/auth" className={styles.exit} onClick={() => navigate('/auth')}>
                            <img src={DoorExit} />
                            <span className={styles.text}>Sign in</span>
                        </Link>
                    }
                </div>
            </div>
            <div className={styles.main}>
                {children}
            </div>
        </div>
    )
}


