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
import { useNavigate } from 'react-router-dom'
import { createMember } from 'api'
import { useMutation } from 'react-query'

interface Props {
    item?: IGetCourseById
}

export const PreviewCouse = ({ item }: Props) => {

    const navigate = useNavigate()

    const createMember_ = useMutation({
        mutationFn: createMember,
        onSuccess: (data) => {
            navigate(`/course/${item?.course.id}/content`)
        },
        onError: (error: any) => {
            console.log(error)
        }
    })

    const onSubmit = () => {
        if (!item) return
        createMember_.mutate({ id: item?.course.id })
    };


    return (
        <Wrapper className={styles.wrapper}>
                <img src={item?.course.image} alt="up" className={styles.upImg} />
                <div className={styles.authorBlock}>
                    <div className={styles.info}>
                        {item && <HeaderPage className={styles.headerTitle} title={item?.course.headline} />}
                        <EditorRenderer data={item?.course.textPreview} />
                    </div>
                    <div className={styles.share}>
                        <div className={styles.author}>
                            <Fs14Fw500Black.span>Автор курса</Fs14Fw500Black.span>
                            <div className={styles.avatarName}>
                                {/* <img src={avatar} alt="avatar" /> */}
                                <div className={styles.authorText}>
                                    <Fs18Fw400.span>{item?.course.Users.name}</Fs18Fw400.span>
                                    <Fs12Fw400.span className={styles.opacity}>{item && getNormalDate(item?.course.createdAt)}</Fs12Fw400.span>
                                </div>
                            </div>
                        </div>
                        <Button isLoading={createMember_.isLoading} onClick={onSubmit}>{item?.foundMember ? 'Продолжить курс' : 'Начать курс'}</Button>
                        <div className={styles.social}>
                            <div className={styles.row}>
                                {item?.course.linkVk && item.course.linkVk !== 'null' && <SocialItem link={item.course.linkVk}>
                                    <img src={vk} alt="" />
                                </SocialItem>}
                                {item?.course.linkTelegram && item.course.linkTelegram !== 'null' && <SocialItem link={item.course.linkTelegram}>
                                    <img src={telegram} alt="" />
                                </SocialItem>}
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
    )
}