import React, { CSSProperties, Dispatch, ForwardedRef, HTMLAttributes, MouseEventHandler, SetStateAction, ChangeEvent, HTMLInputTypeAttribute } from 'react';
import styles from './index.module.scss'
import { FieldError, FieldErrors, FieldValues, RegisterOptions } from "react-hook-form";
import { Error } from 'ui/error';

interface TextArea extends React.HTMLAttributes<HTMLTextAreaElement> {
    name?: string
    register?: any
    error?: FieldError | undefined
    label?: string
}

const withStyle = (styleName: string) => {
    return ({ register, name, error, label, className, ...rest }: TextArea) => {
        return (
            <div className={`${styles.basis} ${styles[styleName]} ${className}`}>
                <label>
                    {label}
                </label>
                <textarea {...register?.(name)} {...rest} className={error?.message && styles.error} />
                <Error isVisible={!!error?.message}>{error?.message}</Error>
            </div>
        );
    };
};

export const TextAreaDark = withStyle("TextAreaDark")