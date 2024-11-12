import React, { useState } from 'react';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import styles from './index.module.scss';
import { Loader } from 'ui/loader';
import success from 'assets/images/success.png'
import warning from 'assets/images/warning.png'
import loading from 'assets/images/loxading.png'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

export interface Option {
    img?: string;
    value: string;
    label: string;
}

interface Props {
    options: Option[];
    placeholder?: string;
    isLoading?: boolean;
    setSelected?: (value: any) => void;
    selected?: string;
    img?: string;
    label?: string;
    dynamicValue?: string
    setValue?: UseFormSetValue<any>
    watch?: UseFormWatch<any>
}

export const RadixWhiteSelect: React.FC<Props> = ({
    options,
    setSelected,
    selected,
    dynamicValue,
    isLoading,
    placeholder,
    setValue,
    label,
    img,
    watch
}) => {

    const hookFormValue = watch?.(label as any);

    const handleOptionClick = (value: string) => {
        setSelected?.(value);

        setValue?.(label ?? "", value, {
            shouldValidate: true
        });

    };

    return (
        <Select.Root defaultValue={selected ? selected : undefined} value={dynamicValue ? dynamicValue : hookFormValue} onValueChange={handleOptionClick}>
            <Select.Trigger className={styles.SelectTrigger} aria-label="Food">
                <Select.Value placeholder={placeholder} />
                <Select.Icon className={styles.SelectIcon}>
                    <ChevronDownIcon />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content className={styles.SelectContent}>
                    <Select.ScrollUpButton className={styles.SelectScrollButton}>
                        <ChevronUpIcon />
                    </Select.ScrollUpButton>
                    <Select.Viewport className={styles.SelectViewport}>
                        <Select.Group>

                            {options.map(item => (

                                <SelectItem key={item.value} value={item.value}>
                                    {img === 'success' && <img className={styles.imageSelectItem} src={success} alt='' />}
                                    {img === 'warning' && <img className={styles.imageSelectItem} src={warning} alt='' />}
                                    {img === 'loading' && <img className={styles.imageSelectItem} src={loading} alt='' />}
                                    {item.label}
                                </SelectItem>
                            ))}
                        </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className={styles.SelectScrollButton}>
                        <ChevronDownIcon />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
};

const SelectItem = React.forwardRef(
    (
        { children, className, ...props }: React.PropsWithChildren<any>,
        forwardedRef
    ) => {
        return (
            <Select.Item
                className={classnames(styles.SelectItem, className)}
                {...props}
                ref={forwardedRef}
            >
                <Select.ItemText>{children}</Select.ItemText>
            </Select.Item>
        );
    }
);
