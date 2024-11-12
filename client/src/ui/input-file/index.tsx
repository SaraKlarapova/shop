import React, { HTMLAttributes } from 'react'
import styles from './index.module.scss'
import { FieldError } from 'react-hook-form'
import { Error } from 'ui/error'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faFileArrowUp, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontSizeIcon } from '@radix-ui/react-icons'

interface Props extends HTMLAttributes<HTMLInputElement> {
    name?: string
    register?: any
    error?: FieldError | undefined
}

export const InputFile = ({ register, name, error, children, className, ...rest }: Props) => {
    return (
        <>
            <label className={`${styles.base} ${styles.customFileUpload} ${className}`} >
                <div>
                    <FontAwesomeIcon icon={faUpload} size="sm" style={{
                        paddingRight: 5
                    }} />
                    {children ? children : 'Upload'}
                </div>
                <input type="file" accept="image/png, image/jpeg, image/svg+xml"  {...register?.(name)} {...rest} className={error?.message && styles.error} />
            </label>
            <Error isVisible={!!error?.message}>{error?.message}</Error>
        </>
    )
}

interface Props extends HTMLAttributes<HTMLInputElement> {
    name?: string
    register?: any
    error?: FieldError | undefined
    image?: string
}

export const InputFileLight = ({ register, name, error, children, className, image, ...rest }: Props) => {
    return (
        <>
            <label className={`${styles.base} ${styles.customFileUploadLight} ${className}`} >
                {image ? <img src={image} /> : <>
                    <div>
                        <FontAwesomeIcon icon={faCirclePlus} style={{
                            paddingRight: 5,
                            fontSize: '50px',
                            color: '#AFAFAF'
                        }} />
                        {children ? children : 'Upload'}
                    </div>
                </>
                }
                <input type="file" accept="image/png, image/jpeg, image/svg+xml"  {...register?.(name)} {...rest} className={error?.message && styles.error} />
            </label>
            <Error isVisible={!!error?.message}>{error?.message}</Error>
        </>
    )
}

export const InputFileLightVideo = ({ register, name, error, children, className, image, ...rest }: Props) => {
    return (
        <>
            <label className={`${styles.base} ${styles.customFileUploadLight} ${className}`} >
                {image ? <video src={image} /> : <>
                    <div>
                        <FontAwesomeIcon icon={faCirclePlus} style={{
                            paddingRight: 5,
                            fontSize: '50px',
                            color: '#AFAFAF'
                        }} />
                        {children ? children : 'Upload'}
                    </div>
                </>
                }
                <input type="file" accept="video/mp4, video/mov"  {...register?.(name)} {...rest} className={error?.message && styles.error} />
            </label>
            <Error isVisible={!!error?.message}>{error?.message}</Error>
        </>
    )
}

export const InputFileLight2 = ({ register, name, error, children, className, image, ...rest }: Props) => {
    return (
        <>
            <label className={`${styles.base} ${styles.customFileUploadLight2} ${className}`} >
                {image ? <img src={image} /> :
                    <div>
                        <FontAwesomeIcon icon={faFileArrowUp} style={{
                            paddingRight: 10,
                            fontSize: '15px',
                            color: '#62666D'
                        }} />
                        {children ? children : 'Upload'}
                    </div>
                }
                <input type="file" accept="image/png, image/jpeg, image/svg+xml"  {...register?.(name)} {...rest} className={error?.message && styles.error} />
            </label>
            <Error isVisible={!!error?.message}>{error?.message}</Error>
        </>
    )
}

export const InputFileLight3 = ({ register, name, error, children, className, image, ...rest }: Props) => {
    return (
        <>
            <label className={`${styles.base} ${styles.customFileUploadLight3} ${className}`} >
                {image ? <img src={image} /> :
                    <div>
                        {children ? children : 'Upload'}
                    </div>
                }
                <input type="file" accept="image/png, image/jpeg, image/svg+xml"  {...register?.(name)} {...rest} className={error?.message && styles.error} />
            </label>
            <Error isVisible={!!error?.message}>{error?.message}</Error>
        </>
    )
}

interface PropsDocuments extends HTMLAttributes<HTMLInputElement> {
    name?: string
    register?: any
    error?: FieldError | undefined
    fileName?: string
}

export const InputFileDocumentsLight = ({ register, name, error, children, className, fileName, ...rest }: PropsDocuments) => {

    return (
        <>
            <label className={`${styles.base} ${styles.customFileUploadLightDocument} ${className}`}>
                {fileName ? (
                    <span>{fileName}</span>
                ) : (
                    <>
                        <div className={styles.container}>
                            <div className={styles.circleContainer}>
                                Выбрать файл
                            </div>
                            {/* {children ? children : 'Upload'} */}
                        </div>
                    </>
                )}
                <input type="file" accept="application/pdf, application/msword, 
                              application/vnd.openxmlformats-officedocument.wordprocessingml.document, 
                              application/vnd.ms-excel, 
                              application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, 
                              application/vnd.ms-powerpoint, 
                              application/vnd.openxmlformats-officedocument.presentationml.presentation, 
                              text/plain, text/rtf"   {...register?.(name)} {...rest} className={error?.message && styles.error} />
            </label>
            <Error isVisible={!!error?.message}>{error?.message}</Error>
        </>
    )
}