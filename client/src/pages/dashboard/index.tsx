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

export const Dashboard = () => {
    return (
        <Routes>
            <Route path='/course/:id/*' element={<Course />}></Route>
            <Route path='/test/:id' element={<Test />}></Route>
            <Route path='/passed-courses' element={<PassedCourses />}></Route>
            <Route path='/verify-certificate' element={<VerifyCertficate />}></Route>
        </Routes>
    )
}
