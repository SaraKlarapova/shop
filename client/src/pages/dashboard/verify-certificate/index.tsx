import React from 'react'
import { ButtonIndigo } from 'ui/buttons'
import { InputFileDocumentsLight } from 'ui/input-file'
import styles from './index.module.scss'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { verifyCertificate } from 'api'
import { withImageData } from 'utils/withImageData'
import { toast } from 'react-toastify'
import { getNormalDate } from 'utils/normalDate'
import { Fs16Fw400, Fs24Fw400Black, Fs24Fw500Black, H1SemiboldFs38 } from 'components/typography'

const validationSchema = z.object({
    file: z.union([z.object({ 0: z.instanceof(File) }), z.any()]).optional(),
})

type validationSchema = z.infer<typeof validationSchema>;

export const VerifyCertficate = () => {

    const verifyCertificate_ = useMutation({
        mutationFn: verifyCertificate,
        onSuccess: (res: any) => {
            toast.success(`
                Подлинный сертификат\n
                Имя: ${res.name}\n
                Email: ${res.email}\n
                Дата: ${getNormalDate(res.date)}\n
                Название курса: ${res.courseName}
            `)
        },
        onError: () => {
            toast.error('Не удалось верифицировать сертификат')
        }
    })

    const {
        setValue,
        register,
        reset,
        handleSubmit,
        watch,
        getValues,
        formState: { errors },
    } = useForm<validationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const filedocumentName = watch('file')?.[0] ? watch('file')?.[0].name : undefined

    const handleUpload = (values: validationSchema) => {
        console.log(values)
        const formattedData = withImageData({ ...values })

        verifyCertificate_.mutate(formattedData)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <H1SemiboldFs38>Загрузите Ваш Сертификат для Проверки</H1SemiboldFs38>
            </div>

            <div className={styles.body}>
                <label>Загрузить сертификат</label>
                <InputFileDocumentsLight fileName={filedocumentName} name='file' register={register} />


                <ButtonIndigo className={styles.load} isLoading={verifyCertificate_.isLoading} onClick={handleSubmit(handleUpload)}>Загрузить</ButtonIndigo>
            </div>
        </div>
    )
}
