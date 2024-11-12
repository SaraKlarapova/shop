import React, { CSSProperties, Dispatch, ForwardedRef, HTMLAttributes, MouseEventHandler, SetStateAction, ChangeEvent, HTMLInputTypeAttribute } from 'react';
import styles from './inputs.module.scss'
import { FieldError, FieldErrors, FieldValues, RegisterOptions } from "react-hook-form";
import { Error } from 'ui/error';

interface Input extends React.HTMLAttributes<HTMLInputElement> {
    value?: any
    type: "password" | "text" | "email" | 'date' | 'number'
    name?: string
    register?: any
    error?: FieldError | undefined
    autoComplete?: string
    label?: string
    placeholder?: string
}

const withStyle = (styleName: string) => {
    return ({ value, register, name, error, label, type, placeholder, className, ...rest }: Input) => {
        return (
            <div className={`${styles.basis} ${styles[styleName]} ${className}`}>
                <label>
                    {label}
                </label>
                <input {...register?.(name, {
                    valueAsNumber: type === "number"
                })} value={value} placeholder={placeholder} type={type} {...rest} className={error?.message && styles.error} />

                <Error isVisible={!!error?.message}>{error?.message}</Error>
            </div>
        );
    };
};

export const Input = withStyle("wrapperInput")
export const InputTransparent = withStyle("InputTransparent")
export const InputDark = withStyle("InputDark")
export const InputLight = withStyle("InputLight")