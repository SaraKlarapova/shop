import { getCourse } from 'api'
import React from 'react'
import { useQuery } from 'react-query'
import styles from './index.module.scss'
import { Card } from 'components/card'
import { Navigate } from 'react-router-dom'

export const Main = () => {

    return (
        <Navigate to={'/panel/all-courses'} replace />
    )
}
