import React, { useState } from "react";
import styles from './index.module.scss'
import { H1SemiboldFs38 } from "components/typography";
import { Button, ButtonIndigo } from "ui/buttons";
import { Card } from "components/card";
import { useQuery } from "react-query";
import { getCourse } from "api";
import { ICourse } from "interfaces";
import { PopUpCourse } from "./components/popup";
import { isVisible } from "@testing-library/user-event/dist/utils";
import { CardAdmin } from "./components/card";

export interface PopUpVisibleCourse {
    visibility: boolean
    data: ICourse | null
}

export const CourseAdmin = () => {

    const [isPopUpVisible, setIsPopUpVisible] = useState<PopUpVisibleCourse>({
        visibility: false,
        data: null
    });

    const { data, isLoading } = useQuery({
        queryKey: ['get-course-admin'],
        queryFn: () => getCourse(),
        keepPreviousData: true,
        refetchInterval: 5000,
    })

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <H1SemiboldFs38>Курсы</H1SemiboldFs38>
                    <ButtonIndigo onClick={() => setIsPopUpVisible({
                        visibility: true,
                        data: null
                    })}>+ Добавить</ButtonIndigo>
                </div>
                <div className={styles.items}>
                    {data?.map(el => (
                        <CardAdmin isVisible={isPopUpVisible} setIsVisible={setIsPopUpVisible} item={el} />
                    ))}
                </div>
            </div>
            {isPopUpVisible.visibility && <PopUpCourse isVisible={isPopUpVisible} setIsVisible={setIsPopUpVisible} />}
        </>
    )
}