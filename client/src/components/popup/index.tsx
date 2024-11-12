import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

import close from 'assets/icons/close-outline.svg'
import increase from 'assets/icons/expand-outline.svg'
import profileId from 'assets/images/Profile.png'
import companyTether from 'assets/images/company.png'
import companyPayeer from 'assets/images/payeer.png'
import { Fs12Fw400, Fs16Fw500, Fs20Fw500Black } from 'components/typography'
import { Button } from 'ui/buttons'

interface PopupComponentProps {
    setIsVisible: (a: boolean) => void;
    isVisible: boolean;
}

const withPopup = <P extends PopupComponentProps>(WrappedComponent: React.ComponentType<any>) => {
    const WithPopup = (props: P) => {
        const { isVisible, setIsVisible } = props;

        useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.keyCode === 27) {
                    setIsVisible(false);
                }
            };

            if (isVisible) {
                window.addEventListener('keydown', handleKeyDown);
            }

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };

        }, [isVisible, setIsVisible]);

        return isVisible ? <WrappedComponent {...props} /> : null;
    };

    return WithPopup;
};


interface Props {
    setIsVisible: (a: boolean) => void
    isVisible: boolean
    children: React.ReactNode
    headline?: string
    description?: string
    search?: React.ReactNode
    button?: React.ReactNode
    image?: string
    logo?: string
    mb1320?: boolean
}

const PopupComponent_: React.FC<Props> = React.forwardRef(({ mb1320, isVisible, setIsVisible, children, headline, description, search, button }, ref) => {

    return (
        <div className={styles.outlet}>
            <div className={styles.closeMark} onClick={() => setIsVisible(false)}></div>
            <div className={`${styles.popup} ${mb1320 && styles.mb1320}`}>
                {headline && <div className={styles.popupHeader}>
                    <div className={styles.popUpId}>
                        <div className={styles.flexTitle}>
                            {headline && <Fs20Fw500Black.h2>{headline}</Fs20Fw500Black.h2>}
                            {button}
                        </div>
                        {description && <Fs12Fw400.span>{description}</Fs12Fw400.span>}
                        {search}
                    </div>

                </div>}
                <div className={styles.popupIcons}>
                    <img className={styles.popupClose} src={close} alt='close' onClick={() => setIsVisible(!isVisible)} />
                </div>
                <div className={styles.scrollbar}>
                    {children}
                </div>
            </div>
        </div>
    )
})

const PopupComponent2_: React.FC<Props> = React.forwardRef(({ isVisible, setIsVisible, children, headline, description, search }, ref) => {
    return (
        <div className={styles.outlet}>
            <div ref={ref as any} className={styles.popup2}>
                <div className={styles.popupHeader}>
                    <div className={styles.popUpId}>
                        <Fs16Fw500.h2>{headline}</Fs16Fw500.h2>
                        {description && <Fs12Fw400.span>{description}</Fs12Fw400.span>}
                        {search}
                    </div>
                    <div className={styles.popupIcons}>
                        <img className={styles.popupClose} src={close} alt='close' onClick={() => setIsVisible(!isVisible)} />
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
})

const PopupComponentDelete_: React.FC<Props> = ({ isVisible, setIsVisible, children, headline, description, search }) => {
    return (
        isVisible ? (
            <div className={styles.outlet}>
                <div className={styles.popup2}>
                    <div className={styles.popupHeader}>
                        <div className={styles.popUpId}>
                            <Fs16Fw500.h2>{headline}</Fs16Fw500.h2>
                            {description && <Fs12Fw400.span>{description}</Fs12Fw400.span>}
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        ) : <></>
    )
}


const PopUpComponentWithLogo_: React.FC<Props> = ({ image, logo, isVisible, setIsVisible, children, headline, description }) => {
    return (
        isVisible ? (
            <div className={styles.outlet}>
                <div className={` ${styles.popUpLogo} `}>
                    <div className={styles.popupHeader}>
                        <div className={styles.popUpId}>
                            <Button className={styles.logoPurple}>
                                <img src={image} alt="icon" />
                                <Fs16Fw500.span>{logo}</Fs16Fw500.span>
                            </Button>
                            <Fs16Fw500.h2>{headline}</Fs16Fw500.h2>
                            <hr className={styles.polosa} />
                        </div>
                        <div className={styles.popupIcons}>
                            <img className={styles.popupClose} src={close} alt='close' onClick={() => setIsVisible(!isVisible)} />
                        </div>
                    </div>
                    {children}
                    <div className={styles.boxBtn}>
                        <hr className={styles.polosa} />
                        <Button className={styles.deelet}>Сохранить</Button>
                    </div>
                </div>
            </div>
        ) : <></>
    )
}

const PopupComponentReview_: React.FC<Props> = React.forwardRef(({ isVisible, setIsVisible, children, headline, description, search }, ref) => {
    return (
        <div className={styles.outlet}>
            <div ref={ref as any} className={styles.popupreview}>
                <div className={styles.popupHeader2}>
                    <div className={styles.popUpId}>
                        <Fs16Fw500.h2>{headline}</Fs16Fw500.h2>
                    </div>
                    <svg className={styles.svgrev} onClick={() => setIsVisible(!isVisible)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="20" fill="#F1F2F3" />
                        <path opacity="0.5" d="M28 13.3333L26.6667 12L19.9998 18.6667L13.3333 12.0003L12 13.3336L18.6665 20L12 26.6664L13.3334 27.9997L19.9999 21.3333L26.6667 28L28 26.6667L21.3332 20L28 13.3333Z" fill="#3A3F48" />
                    </svg>
                </div>
                <hr className={styles.polosaReview} />
                {children}
            </div>
        </div>
    )
})

export const PopupComponent = withPopup<Props>(PopupComponent_);
export const PopupComponent2 = withPopup<Props>(PopupComponent2_);
export const PopupComponentReview = withPopup<Props>(PopupComponentReview_);
export const PopupComponentDelete = withPopup<Props>(PopupComponentDelete_);
export const PopUpComponentWithLogo = withPopup<Props>(PopUpComponentWithLogo_);

