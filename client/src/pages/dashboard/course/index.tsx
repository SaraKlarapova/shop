import React, { useState } from 'react'
import { Wrapper } from 'components/wrapper/wrapper'
import styles from './index.module.scss'
import { HeaderPage } from 'components/headline'
import { Fs12Fw400, Fs14Fw500Black, Fs18Fw400 } from 'components/typography'
import { SocialItem } from 'components/social-item'
import { Route, Routes, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getNormalDate } from 'utils/normalDate'
import { EditorRenderer } from 'components/editor-renderer'
import ScrollToTop from 'utils/scrollToTop'
import vk from 'assets/icons/vk.svg'
import telegram from 'assets/icons/telegram.svg'
import { Button } from 'ui/buttons'
import { PreviewCouse } from './components/preview'
import { ContentCourse } from './components/content'
import { useJwtStore } from 'stores/jwt'

export const Course = () => {

    const jwt = useJwtStore(state => state.role)

    // const { data, isLoading } = useQuery({
    //     queryFn: () => getCourseById(Number(id)),
    //     queryKey: ['client-get-course', id],
    //     keepPreviousData: true
    // })
    // const shareText = `Посмотрите эту новость на Shell: ${dataNews?.title}`;
    // const shareUrl = `https://shell.in.ua/shell-inside/inside-page/${id}`;
    // const shareImage = dataNews?.preview || '';
    // const maxDescriptionLength = 150; // Максимальная длина описания

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<PreviewCouse />}></Route>
                {jwt && <Route path='/content' element={<ContentCourse />}></Route>}
            </Routes>
        </>

    )
}
