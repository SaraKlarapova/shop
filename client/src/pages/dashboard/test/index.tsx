import { getTest, passTest } from 'api';
import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.scss'
import { ButtonIndigo } from 'ui/buttons';
import { toast } from 'react-toastify';

export const Test = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [chosenQuestions, setChosenQuestions] = useState({});

    const { data } = useQuery({
        queryFn: () => getTest(Number(id)),
        queryKey: ['test', id],
        keepPreviousData: true
    })

    const handleChooseOptions = (index: number, chosenId: number) => {
        const copy = { ...chosenQuestions };

        if ((copy as any)[index] === chosenId) {
            (copy as any)[index] = undefined;
        } else {
            (copy as any)[index] = chosenId;
        }
        setChosenQuestions(copy)
    }

    const passTest_ = useMutation({
        mutationFn: passTest,
        onSuccess: async (res) => {
            if (!data?.minimumQuestionsAnswered) return;

            if (res.score >= data?.minimumQuestionsAnswered) {
                toast.success(`Вы прошли тест: набрали ${res.score} баллов из ${data?.Questions.length}`)
            } else {
                toast.error(`Вы не прошли тест: набрали ${res.score} баллов из ${data?.Questions.length}`)
            }

            navigate(-1)
        },
        onError: (error: any) => {
        }
    })

    const handlePassTest = () => {
        passTest_.mutate({
            answers: chosenQuestions,
            testId: Number(id)
        })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.items}>
                {
                    data?.Questions.map((question, index) => (
                        <div className={styles.question}>
                            <div className={styles.header}>
                                {index + 1}. {question.question}
                            </div>
                            <div className={styles.answers}>
                                {
                                    question?.AnswerOptions.map((el) => (
                                        <div className={`${styles.answer} ${(chosenQuestions as any)[question.id] === el.id ? styles.isChosen : ""}`} onClick={() => handleChooseOptions(question.id, el.id)}>
                                            {el.asnwer}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
                <ButtonIndigo isLoading={passTest_.isLoading} onClick={handlePassTest}>Закончить тестирование</ButtonIndigo>
            </div>
        </div>
    )
}
