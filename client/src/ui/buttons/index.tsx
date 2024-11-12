import { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import styles from './index.module.scss'
import { Loader } from 'ui/loader';

interface Props extends HTMLAttributes<HTMLDivElement> {
    isLoading?: boolean
    active?: boolean
    disabled?: boolean
}

const withStyle = (styleName: string) => {
    return ({ children, onClick, className, disabled, isLoading, active, ...rest }: Props) => {
        return (
            <div className={`${styles.base} ${styles[styleName]} ${disabled ? styles.disabled : null} ${isLoading ? styles.loading : null} ${className}`} onClick={(isLoading || disabled) ? () => { } : onClick}  {...rest} >
                {isLoading ? <Loader /> : children}
            </div >
        );
    };
};

const withStyleToggle = (styleName: string) => {
    return ({ children, onClick, className, isLoading, active, ...rest }: Props) => {
        return (
            <div className={`${styles.base} ${active && styles.active} ${styles[styleName]} ${isLoading ? styles.loading : null} ${className}`} onClick={isLoading ? () => { } : onClick} {...rest} >
                {isLoading ? <Loader /> : children}
            </div >
        );
    }
}
export const Button = withStyle("buttonStandart");
export const ButtonGradient = withStyle("buttonGradient");
export const ButtonBlue = withStyle("buttonBlue");
export const ButtonDownriver = withStyleToggle("buttonDownriver");
export const ButtonCopy = withStyle("buttonCopy");
export const ButtonViolet = withStyle("buttonViolet");
export const ButtonGray = withStyle("buttonGray");
export const ButtonGrayAndBlue = withStyleToggle("buttonGray");
export const ButtonIndigo = withStyle("buttonIndigo");
export const ButtonCard = withStyle("ButtonCard");