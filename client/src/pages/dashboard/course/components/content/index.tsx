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
import { Link, useNavigate } from 'react-router-dom'

interface Props {
    item?: IGetCourseById
}

export const ContentCourse = ({ item }: Props) => {

    const navigate = useNavigate()

    return (
        <Wrapper className={styles.wrapper}>
            <img src={item?.course.image} alt="up" className={styles.upImg} />
            <div className={styles.authorBlock}>
                <div className={styles.info}>
                    {item && <HeaderPage className={styles.headerTitle} title={item?.course.headline} />}
                    <div className={styles.content}>
                        {item && item.course.video !== 'null' && item.course.video !== null && <video width={'100%'} controls>
                            <source src={item.course.video} type='video/mp4' />
                        </video>}
                        <EditorRenderer data={item?.course.text} />
                        <div className={styles.testsWrapper}>
                            <Fs20Fw500Black.h3>Тесты, которые нужно пройти для получения сертификата:</Fs20Fw500Black.h3>
                            <div className={styles.tests}>
                                {item?.course.CourseTestRelation.map(el => (
                                    <Link className={styles.test} to={`/panel/test/${el.testId}`}>
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
                                <Fs18Fw400.span>{item?.course.Users.name}</Fs18Fw400.span>
                                <Fs12Fw400.span className={styles.opacity}>{item && getNormalDate(item?.course.createdAt)}</Fs12Fw400.span>
                            </div>
                        </div>
                    </div>
                    {/* <Button onClick={() => navigate(`/panel/course/${item?.id}/content`)}>Начать тест</Button> */}
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