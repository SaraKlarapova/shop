

import React from 'react'
import styles from './index.module.scss'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/navbar'
import { MainScreen } from '../pages/main-page'
import { CreateTest } from './tests'
import { CourseAdmin } from './course'
import { DisplayTests } from './display-tests'
import { VerifyCertficate } from 'pages/dashboard/verify-certificate'

export const AdminPanel = () => {
    return (
        <div className={styles.bg}>
            <div className={styles.wrapper}>
                <Navbar>
                    <Routes>
                        <Route path='/' element={<CourseAdmin />}></Route>
                        <Route path='/create-test' element={<CreateTest />}></Route>
                        <Route path='/tests' element={<DisplayTests />}></Route>
                        <Route path='/verify-certificate' element={<VerifyCertficate />}></Route>
                    </Routes>
                </Navbar>
            </div>
        </div>
    )
}
