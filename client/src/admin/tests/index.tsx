import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { Fs14Fw400Black, Fs18Fw500, Fs38Fw600Black, H1SemiboldFs38 } from 'components/typography'
import { ITest, Questions } from 'interfaces';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { createTest } from 'api';
import { toast } from 'react-toastify';
import { ButtonIndigo } from 'ui/buttons';
import { deepCopyArray } from 'utils/deepcopy';
import { InputLight } from 'ui/inputs/input';
import { trashCan } from 'assets/icons';
import { useLocation, useNavigate } from 'react-router-dom';

export const validationSchema = z.object({
    headline: z.string().min(1, "Заполните заголовок"),
    minpass: z.number().min(1, "Заполните минимальный"),
})

type validationSchema = z.infer<typeof validationSchema>;

interface IState {
    state: ITest
}

export const CreateTest = () => {

    const navigate = useNavigate()

    const { state }: IState = useLocation();

    const [questions, setQuestions] = useState<Questions[]>([]);

    const {
        setValue,
        register,
        handleSubmit,
        reset,
        formState: { errors },
        getValues,
        watch
    } = useForm<validationSchema>({
        resolver: zodResolver(validationSchema),
    });


    const createTest_ = useMutation({
        mutationFn: createTest,
        onSuccess: (data) => {
            toast.success("Поле формы добавлено")
            navigate("/admin-panel/tests")
        },
        onError: (error: any) => {
            console.log(error)
        }
    })

    const onSubmit = (values: validationSchema) => {
        createTest_.mutate({ ...values, questions, id: state?.id })
    };

    const addQuestion = () => {
        setQuestions(prev => [{
            question: '',
            AnswerOptions: []
        }, ...deepCopyArray(prev)])
    }

    const addAnswer = (index: number) => {
        const copiedQuestions = deepCopyArray(questions);

        copiedQuestions[index].AnswerOptions.push({
            asnwer: '',
            isCorrect: false
        })

        setQuestions(copiedQuestions);
    }

    const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const copiedQuestions = deepCopyArray(questions);

        copiedQuestions[index].question = e.target.value;

        setQuestions(copiedQuestions);
    }

    const makeCorrect = (questionIndex: number, answerIndex: number) => {
        const copiedQuestions = deepCopyArray(questions);

        for (let i = 0; i < copiedQuestions[questionIndex].AnswerOptions.length; i++) {
            if (answerIndex === i) {
                continue;
            }

            copiedQuestions[questionIndex].AnswerOptions[i].isCorrect = false
        }

        copiedQuestions[questionIndex].AnswerOptions[answerIndex].isCorrect = !copiedQuestions[questionIndex].AnswerOptions[answerIndex].isCorrect;

        setQuestions(copiedQuestions);
    }


    const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => {
        const copiedQuestions = deepCopyArray(questions);

        copiedQuestions[questionIndex].AnswerOptions[answerIndex].asnwer = e.target.value;

        setQuestions(copiedQuestions);
    }

    const deleteAnswer = (questionIndex: number, answerIndex: number) => {
        const copiedQuestions = deepCopyArray(questions);

        copiedQuestions[questionIndex].AnswerOptions.splice(answerIndex, 1);

        setQuestions(copiedQuestions);
    }

    const deleteQuestion = (questionIndex: number) => {
        const copiedQuestions = deepCopyArray(questions);

        copiedQuestions.splice(questionIndex, 1);

        setQuestions(copiedQuestions);
    }

    useEffect(() => {
        if (state?.id) {
            const formattedData: Questions[] = state.Questions.map(el => ({
                question: el.question,
                AnswerOptions: el.AnswerOptions.map(el => ({
                    asnwer: el.asnwer,
                    isCorrect: el.isCorrect
                }))
            }))

            setQuestions(formattedData);

            reset({
                headline: state.headline,
                minpass: state.minimumQuestionsAnswered
            })
        }
    }, [])

    return (
        <>
            <div className={styles.header}>
                {/* <H1Bold>Создание теста</H1Bold> */}
                <H1SemiboldFs38>Создание теста</H1SemiboldFs38>

                <ButtonIndigo onClick={addQuestion}>Добавить вопрос</ButtonIndigo>
                <ButtonIndigo className={styles.submit} onClick={handleSubmit(onSubmit)} isLoading={createTest_.isLoading}>Сохранить</ButtonIndigo>
            </div>

            <div className={styles.body}>
                <InputLight type='text' label='Название теста' placeholder='Тест №1' register={register} name='headline' error={errors.headline} />
                <InputLight type='number' label='Проходной балл' placeholder='1' register={register} name='minpass' error={errors.minpass} />

                <Fs14Fw400Black.p className={styles.questions}>Вопросы</Fs14Fw400Black.p>
                <div className={styles.items}>
                    {
                        questions.map((el, indexquestion) => (
                            <div className={styles.item}>
                                <div className={styles.top}>
                                    <InputLight onChange={(e) => handleChangeQuestion(e as any, indexquestion)} type='text' placeholder='Вопрос' value={el.question} />
                                    <ButtonIndigo className={styles.add} onClick={() => addAnswer(indexquestion)}>Добавить ответ</ButtonIndigo>
                                    <div className={styles.trashcan} onClick={() => deleteQuestion(indexquestion)}>
                                        {trashCan}
                                    </div>
                                </div>
                                <div className={styles.answers}>
                                    {
                                        el.AnswerOptions.map((el, indexanswer) => (
                                            <div className={styles.top}>
                                                <InputLight className={el.isCorrect ? styles.green : ''} onChange={(e) => handleChangeAnswer(e as any, indexquestion, indexanswer)} type='text' placeholder='Ответ' value={el.asnwer} />
                                                <ButtonIndigo className={styles.add} onClick={() => makeCorrect(indexquestion, indexanswer)}>{!el.isCorrect ? 'Неверно' : 'Верно'}</ButtonIndigo>
                                                <div className={styles.trashcan} onClick={() => deleteAnswer(indexquestion, indexanswer)}>
                                                    {trashCan}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
