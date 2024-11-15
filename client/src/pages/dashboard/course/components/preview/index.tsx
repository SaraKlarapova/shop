import React, { useState } from 'react'
import { Wrapper } from 'components/wrapper/wrapper'
import styles from '../../index.module.scss'
import { HeaderPage } from 'components/headline'
import { Fs12Fw400, Fs14Fw500Black, Fs18Fw400 } from 'components/typography'
import { SocialItem } from 'components/social-item'
import { getNormalDate } from 'utils/normalDate'
import { EditorRenderer } from 'components/editor-renderer'
import vk from 'assets/icons/vk.svg'
import telegram from 'assets/icons/telegram.svg'
import { Button } from 'ui/buttons'
import { IGetCourseById } from 'interfaces'
import { useNavigate, useParams } from 'react-router-dom'
import { createMember, getPreviewCourse } from 'api'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

export const PreviewCouse = () => {

    const { id } = useParams()

    const { data, isLoading } = useQuery({
        queryFn: () => getPreviewCourse(Number(id)),
        queryKey: ['get-preview-course', Number(id)],
        keepPreviousData: true
    })

    const navigate = useNavigate()

    const createMember_ = useMutation({
        mutationFn: createMember,
        onSuccess: () => {
            navigate(`/course/${data?.course.id}/content`, {
                state: {
                    id: Number(id)
                }
            })
        },
        onError: (error: any) => {
            toast.error('You need to sign in')
        }
    })

    const onSubmit = () => {
        if (!data) return
        createMember_.mutate({ id: Number(id) })
    };


    return (
        <Wrapper className={styles.wrapper}>
                <img src={data?.course.image} alt="up" className={styles.upImg} />
                <div className={styles.authorBlock}>
                    <div className={styles.info}>
                        {data && <HeaderPage className={styles.headerTitle} title={data?.course.headline} />}
                        <EditorRenderer data={data?.course.textPreview} />
                    </div>
                    <div className={styles.share}>
                        <div className={styles.author}>
                            <Fs14Fw500Black.span>Автор курса</Fs14Fw500Black.span>
                            <div className={styles.avatarName}>
                                {/* <img src={avatar} alt="avatar" /> */}
                                <div className={styles.authorText}>
                                    <Fs18Fw400.span>{data?.course.Users.name}</Fs18Fw400.span>
                                    <Fs12Fw400.span className={styles.opacity}>{data && getNormalDate(data?.course.createdAt)}</Fs12Fw400.span>
                                </div>
                            </div>
                        </div>
                        <Button isLoading={createMember_.isLoading} onClick={onSubmit}>{data?.foundMember ? 'Продолжить курс' : 'Начать курс'}</Button>
                        <div className={styles.social}>
                            <div className={styles.row}>
                                {data?.course.linkVk && data.course.linkVk !== 'null' && <SocialItem link={data.course.linkVk}>
                                    <img src={vk} alt="" />
                                </SocialItem>}
                                {data?.course.linkTelegram && data.course.linkTelegram !== 'null' && <SocialItem link={data.course.linkTelegram}>
                                    <img src={telegram} alt="" />
                                </SocialItem>}
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
    )
}