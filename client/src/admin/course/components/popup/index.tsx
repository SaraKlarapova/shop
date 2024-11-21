import React, { useEffect, useMemo, useState } from "react";
import styles from './index.module.scss'
import { PopUpVisibleCourse } from "admin/course";
import { PopupComponent } from "components/popup";
import { z } from "zod";
import { Editor } from 'components/editor'
import EditorJS from '@editorjs/editorjs'
import { useMutation, useQuery } from "react-query";
import { createCourse, getTests } from "api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { withImageData } from "utils/withImageData";
import { InputLight } from "ui/inputs/input";
import { InputFileLight, InputFileLightVideo } from "ui/input-file";
import { Button } from "ui/buttons";
import { Fs14Fw400 } from "components/typography";
import { Option } from "interfaces";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { SelectWithSearch } from "admin/components/modal-search";
import { mapToOptions } from "utils/mappings";

interface Props {
    isVisible: PopUpVisibleCourse
    setIsVisible: React.Dispatch<React.SetStateAction<PopUpVisibleCourse>>
}

const validationSchema = z.object({
    fileImage: z.union([z.object({ 0: z.instanceof(File) }), z.any()]).optional(),
    fileVideo: z.union([z.object({ 0: z.instanceof(File) }), z.any()]).optional(),
    image: z.string().optional(),
    video: z.string().optional().nullable(),
    headline: z.string().min(1),
    minutes: z.number().optional().nullable(),
    price: z.number().optional().nullable(),
    linkTelegram: z.string().optional().nullable(),
    linkVk: z.string().optional().nullable(),
})

type validationSchema = z.infer<typeof validationSchema>;

export const PopUpCourse = ({ isVisible, setIsVisible }: Props) => {

    const handleVisibilityPopUp = (value: boolean) => {
        setIsVisible(prev => ({ ...prev, visibility: value }))
    }
    const [isModalVisibleOutgoing, setIsModalVisibleOutgoing] = useState(false);

    const [savedOptions, setSavedOptions] = useState<Option[]>([]);

    const { data } = useQuery({
        queryKey: ['get-all-tests'],
        queryFn: getTests,
        keepPreviousData: true
    })

    const optionsOutgoing = useMemo(() => {
        if (!data) return [];
        const formattedData = data.map(el => ({
            label: el.headline,
            value: String(el.id)
        }))
        return formattedData.filter(el => !savedOptions.map(item => item.value).includes(el.value))
    }, [data, savedOptions]);

    const refText = React.useRef<EditorJS>()
    const refTextPreview = React.useRef<EditorJS>()

    const createCourse_ = useMutation({
        mutationFn: createCourse,
        onSuccess: (data) => {
            toast.success("Курс успешно создан")
            setIsVisible({ visibility: false, data: null })
        },
        onError: (error: any) => {
            toast.error("Ошибка")
        }
    })

    const {
        setValue,
        register,
        reset,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<validationSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            minutes: 0
        }
    });

    const previousImage = isVisible?.data?.image;
    const previousVideo = isVisible.data?.video;

    const image = watch('fileImage')?.[0] ? URL.createObjectURL(watch('fileImage')?.[0]) : undefined
    const video = watch('fileVideo')?.[0] ? URL.createObjectURL(watch('fileVideo')?.[0]) : undefined

    const onSubmit = async (values: validationSchema) => {

        const textItem = await refText.current?.save();
        const textPreviewItem = await refTextPreview.current?.save();

        const formattedData = withImageData({ ...values, id: isVisible.data?.id, text: textItem, textPreview: textPreviewItem, relatedTests: savedOptions })

        createCourse_.mutate(formattedData)
    }

    useEffect(() => {
        if (isVisible.data) {

            reset({
                image: isVisible.data.image,
                video: isVisible.data.video,
                headline: isVisible.data.headline,
                minutes: isVisible.data.minutes,
                linkTelegram: isVisible.data.linkTelegram,
                linkVk: isVisible.data.linkVk,
                price: isVisible.data.price,
            })

            setSavedOptions(isVisible.data.CourseTestRelation.map(el => ({
                label: el.Test.headline,
                value: String(el.Test.id)
            })))
        }
    }, [isVisible.data])

    const handleSetOptionOutgoing = (option: Option) => {
        setSavedOptions(prev => [...prev, option])
    }

    const handleRemoveOptionElementOutgoing = (option: Option) => {
        setSavedOptions(prev => prev.filter(el => el.value !== option.value))
    }

    return (
        <PopupComponent headline="Добавление курса" isVisible={isVisible.visibility} setIsVisible={handleVisibilityPopUp}>
            <div className={styles.wrapper}>
                <InputLight type="text" name="headline" error={errors.headline} register={register} label="Название" />
                <InputLight type="number" name="price" error={errors.price} register={register} label="Цена" />
                <InputLight type="number" name="minutes" error={errors.minutes} register={register} label="Время прохождения" />
                <InputLight type="text" name="linkTelegram" error={errors.linkTelegram} register={register} label="Ссылка на telegram" />
                <InputLight type="text" name="linkVk" error={errors.linkVk} register={register} label="Ссылка на vk" />
                <div className={styles.editors}>
                    <Fs14Fw400.span>Текст</Fs14Fw400.span>
                    <div className={styles.editor}>
                        <Editor id='text' ref={refText} previousData={isVisible.data?.text} />
                    </div>
                    <Fs14Fw400.span>Текст превью</Fs14Fw400.span>
                    <Editor id='textPreview' ref={refTextPreview} previousData={isVisible.data?.textPreview} />
                </div>
                <InputFileLight image={image || previousImage} name='fileImage' register={register}>Зарузить картинку</InputFileLight>
                <InputFileLightVideo image={video || previousVideo} name='fileVideo' register={register}>Загрузить видео</InputFileLightVideo>

                <h3>Привязанные тесты</h3>

                <div className={styles.fieldManagement}>
                    <div className={styles.relativeWrapper}>
                        <div className={styles.plusIcon} onClick={() => setIsModalVisibleOutgoing(true)}>
                            <PlusIcon />
                        </div>
                        <div className={styles.selectModal}>
                            <SelectWithSearch setOption={handleSetOptionOutgoing} options={optionsOutgoing} isVisible={isModalVisibleOutgoing} setIsVisible={setIsModalVisibleOutgoing} />
                        </div>
                    </div>

                    <div className={styles.fields}>
                        {savedOptions.map(el =>
                            <div className={styles.field} >
                                <div className={styles.cross} onClick={() => handleRemoveOptionElementOutgoing(el)}><Cross2Icon fontSize={10} /></div>
                                <div>{el.label}</div>
                            </div>)}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <Button isLoading={createCourse_.isLoading} onClick={handleSubmit(onSubmit)}>Создать</Button>
                    <Button onClick={() => setIsVisible({ data: null, visibility: false })}>Отменить</Button>
                </div>
            </div>
        </PopupComponent>
    )
}