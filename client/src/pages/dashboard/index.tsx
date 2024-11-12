import { Navbar } from 'components/navbar'
import React from 'react'
import styles from './index.module.scss'
import { Route, Routes } from 'react-router-dom'
import { Main } from './main'
import { AllCourses } from './all-courses'
import { Test } from './test'
import { Course } from './course'
import { PassedCourses } from './passed-courses'
import { VerifyCertficate } from './verify-certificate'

export const Dashboard = () => {
    return (
        <div className={styles.bg}>
            <div className={styles.wrapper}>
                <Navbar>
                    <Routes>
                        <Route path='/' element={<Main />}></Route>
                        <Route path='/all-courses' element={<AllCourses />}></Route>
                        <Route path='/test/:id' element={<Test />}></Route>
                        <Route path='/course/:id/*' element={<Course />}></Route>
                        <Route path='/passed-courses' element={<PassedCourses />}></Route>
                        <Route path='/verify-certificate' element={<VerifyCertficate />}></Route>
                    </Routes>
                </Navbar>
            </div>
        </div>
    )
}
