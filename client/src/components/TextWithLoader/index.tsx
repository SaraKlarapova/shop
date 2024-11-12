import { AnimatePresence, motion } from 'framer-motion';
import styles from './Shimmer.module.scss';
import React, { useState, useEffect, createContext, useContext, ReactNode, FC, HTMLAttributes } from 'react';

interface LoadingContextData {
    isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextData>({
    isLoading: false,
});

interface ParentProps {
    isLoading: boolean | undefined;
    children: ReactNode;
}

interface ParentComposition {
    Span: FC<SpanChildProps>;
    Div: FC<DivChildProps>;
    Img: FC<ImgChildProps>;
    Component: FC<ComponenthildProps>;
    Opacity: FC<DivChildProps>
}

export const LazyArticle: FC<ParentProps> & ParentComposition = ({ isLoading, children }) => {

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setIsLoaded(true);
        } else {
            setIsLoaded(false);
        }
    }, [isLoading]);

    return (
        <LoadingContext.Provider value={{ isLoading: isLoaded }}>
            {children}
        </LoadingContext.Provider>
    );
};


interface SpanChildProps extends HTMLAttributes<HTMLSpanElement> {
}

interface DivChildProps extends HTMLAttributes<HTMLDivElement> {
}

interface ImgChildProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
}

interface ComponenthildProps extends HTMLAttributes<HTMLDivElement> {
    Component: JSX.Element;
}

const Span: React.FC<SpanChildProps> = ({ className, children, ...rest }) => {
    const { isLoading } = useContext(LoadingContext);

    return (
        <>
            {isLoading ? <span className={className} {...rest}>{children}</span> :
                <span
                    className={`${styles.shimmer} ${className}`}
                >
                    &nbsp;
                </span>
            }
        </ >
    );
};

const Div: React.FC<DivChildProps> = ({ className, children, ...rest }) => {
    const { isLoading } = useContext(LoadingContext);

    return (
        <>
            {isLoading ? <div className={className} {...rest}>{children}</div> :
                <div
                    className={`${styles.shimmer} ${className}`}
                >
                    &nbsp;
                </div>
            }
        </ >
    );
};

const Img: React.FC<ImgChildProps> = ({ className, children, ...rest }) => {
    const { isLoading } = useContext(LoadingContext);

    return (
        <>
            {isLoading ? <img className={className} {...rest} /> :
                <div
                    className={`${styles.shimmer} ${className}`}
                >
                    &nbsp;
                </div>
            }
        </ >
    );
};

const Component: React.FC<ComponenthildProps> = ({ className, Component, children, ...rest }) => {
    const { isLoading } = useContext(LoadingContext);

    return (
        <>
            {isLoading ? Component :
                <div
                    className={`${styles.shimmer} ${className}`}
                >
                    &nbsp;
                </div>
            }
        </ >
    );
};

const Opacity: React.FC<DivChildProps> = ({ className, children, ...rest }) => {
    const { isLoading } = useContext(LoadingContext);

    return (
        <>
            {isLoading ? children :
                <div className={`${styles.shimmer} ${styles.opacity} ${className}`}
                >
                    {children}
                </div>
            }
        </ >
    );
};

LazyArticle.Span = Span;
LazyArticle.Div = Div;
LazyArticle.Img = Img;
LazyArticle.Component = Component;
LazyArticle.Opacity = Opacity;