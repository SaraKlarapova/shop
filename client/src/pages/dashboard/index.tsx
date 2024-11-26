import { Navbar } from 'components/navbar'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Main } from './main'
import { AllCourses } from './all-courses'
import { Test } from './test'
import { Course } from './course'
import { PassedCourses } from './passed-courses'
import { VerifyCertficate } from './verify-certificate'
import { RequireAuth } from 'utils/requireAuth'
import { Helmet } from 'react-helmet'

export const Dashboard = () => {
    return (
        <>
        <Helmet>
            <title>SkillSync</title>
            <meta name="description" content="SkillSync - платформа обучения" />
            <meta name="keywords" content="SkillSync, обучение, Skill Sync, платформа, платформа обучения, программирование" />

            <meta property="og:title" content="SkillSync - платформа обучения" />
            <meta property="og:description" content="SkillSync - это платформа для обучения программированию" />
            <meta property="og:image" content="https://n-shop.storage.yandexcloud.net/n-shop/1732381367478" />
            <meta property="og:url" content="http://localhost:3001" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="SkillSync" />
            <meta name="twitter:description" content="SkillSync - это платформа для обучения программированию" />
            <meta name="twitter:image" content="https://n-shop.storage.yandexcloud.net/n-shop/1732381367478" />
        </Helmet>
        <Routes>
            
            <Route path='/test/:id' element={<Test />}></Route>
            <Route path='/passed-courses' element={<PassedCourses />}></Route>
            <Route path='/verify-certificate' element={<VerifyCertficate />}></Route>
        </Routes>
        </>
    )
}
