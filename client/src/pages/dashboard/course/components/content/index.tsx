import React, { useState } from 'react'
import { Wrapper } from 'components/wrapper/wrapper'
import styles from '../../index.module.scss'
import { HeaderPage } from 'components/headline'
import { Fs12Fw400, Fs14Fw400, Fs14Fw500Black, Fs16Fw400Black, Fs18Fw400, Fs20Fw500Black } from 'components/typography'
import { SocialItem } from 'components/social-item'
import { getNormalDate } from 'utils/normalDate'
import { EditorRenderer } from 'components/editor-renderer'
import vk from 'assets/icons/vk.svg'
import telegram from 'assets/icons/telegram.svg'
import { Button } from 'ui/buttons'
import { IGetCourseById } from 'interfaces'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getFullCourse } from 'api'
import { useQuery } from 'react-query'

export const ContentCourse = () => {

    const location = useLocation()
    const id = location.state?.id
    
    const { data, isLoading } = useQuery({
        queryFn: () => getFullCourse(Number(id)),
        queryKey: ['get-full-course', Number(id)],
        keepPreviousData: true
    })

    return (
        <Wrapper className={styles.wrapper}>
            <img src={data?.course.image} alt="up" className={styles.upImg} />
            <div className={styles.authorBlock}>
                <div className={styles.info}>
                    {data && <HeaderPage className={styles.headerTitle} title={data?.course.headline} />}
                    <div className={styles.content}>
                        {data && data.course.video !== 'null' && data.course.video !== null && <video width={'100%'} controls>
                            <source src={data.course.video} type='video/mp4' />
                        </video>}
                        <EditorRenderer data={data?.course.text} />
                        <div className={styles.testsWrapper}>
                            <Fs20Fw500Black.h3>Тесты, которые нужно пройти для получения сертификата:</Fs20Fw500Black.h3>
                            <div className={styles.tests}>
                                {data?.course.CourseTestRelation.map(el => (
                                    <Link className={styles.test} to={`/test/${el.testId}`}>
                                        <Fs16Fw400Black.span>{el.Test.headline}</Fs16Fw400Black.span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
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
                    {/* <Button onClick={() => navigate(`/panel/course/${item?.id}/content`)}>Начать тест</Button> */}
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