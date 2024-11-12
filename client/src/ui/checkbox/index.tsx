import React, { HTMLAttributes, ReactNode, useState } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import './styles.css';
import { FieldError, UseFormSetValue } from 'react-hook-form';
import { Error } from 'ui/error';

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    label?: string;
    setValue?: UseFormSetValue<any>
    error?: FieldError | undefined
    acceptFunds?: boolean
}

export const CheckboxUI = ({ children, label, setValue, className, error }: Props) => {
    const [confirm, setConfirm] = useState(false);

    const setState = (confirm: boolean) => {
        setConfirm(confirm);
        setValue?.(label ?? "", confirm, {
            shouldValidate: true
        });
    }

    return (
        <form>
            <div className={className} style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox.Root className="CheckboxRoot" id="c1" onCheckedChange={() => setState(!confirm)}>
                    <Checkbox.Indicator className="CheckboxIndicator">
                        <CheckIcon />
                    </Checkbox.Indicator>
                </Checkbox.Root>
                <label className={`Label`} htmlFor="c1">
                    {children}
                </label>
            </div>
            <Error isVisible={!!error?.message}>
                {error?.message}
            </Error>
        </form>
    )
};
