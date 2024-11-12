import React, { HTMLAttributes, ReactNode } from 'react';
import styles from './wrapper.module.scss'

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export const Wrapper = ({ children, className, ...rest }: Props) => {
    return (
        <div className={`${styles.wrapper} ${className}`} {...rest}>
            <div className={`${styles.cotainer}`}>
                {children}
            </div>
        </div>
    );
}

