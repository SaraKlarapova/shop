import React, { HTMLAttributes } from 'react';
import styles from './index.module.scss'

const tags = ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] as const;

type Tag = typeof tags[number];

interface Props extends HTMLAttributes<HTMLElement> { }

const createComponentCache = (styleName: string) => {
    const componentCache = new Map<Tag, React.FC<Props>>();

    const createProxyComponent = new Proxy({} as { [K in Tag]: React.FC<Props> }, {
        get: (_target, key: Tag) => {
            if (!componentCache.has(key)) {
                const TagComponent: React.FC<Props> = ({ children, className, ...rest }) => {
                    return React.createElement(key, {
                        ...rest,
                        className: `${styles.base} ${styles[styleName]} ${className}`
                    }, children);
                };
                componentCache.set(key, TagComponent);
            }
            return componentCache.get(key);
        },
    });

    return createProxyComponent;
};

const Typography = (styleName: string) => {
    const componentCache = createComponentCache(styleName);

    return componentCache;
};

// export const H1Bold = Typography('H1Bold').h1;
// export const H2Medium = Typography('H2Medium').h2;
// export const H2Regular = Typography('H2Regular').h2;
// export const Fs36 = Typography('fs36');

export const Fs38Fw600Red = Typography('Fs38Fw600Red');
export const Fs38Fw700Red = Typography('Fs38Fw700Red');
export const Fs38Fw600White = Typography('Fs38Fw600White');
export const Fs38Fw600Black = Typography('Fs38Fw600Black');
export const Fs18Fw400 = Typography('Fs18Fw400');
export const Fs18Fw400Black = Typography('Fs18Fw400Black');
export const Fs18Fw400White = Typography('Fs18Fw400White');
export const Fs18Fw500 = Typography('Fs18Fw500');
export const Fs18Fw500Black = Typography('Fs18Fw500Black');
export const Fs16Fw400 = Typography('Fs16Fw400');
export const Fs16Fw700 = Typography('Fs16Fw700');
export const Fs16Fw400Black = Typography('Fs16Fw400Black');
export const Fs16Fw400White = Typography('Fs16Fw400White');
export const Fs16Fw500White = Typography('Fs16Fw500White');
export const Fs16Fw500Black = Typography('Fs16Fw500Black');
export const Fs16Fw500 = Typography('Fs16Fw500');
export const Fs24Fw600Black = Typography('Fs24Fw600Black');
export const Fs20Fw500Black = Typography('Fs20Fw500Black');
export const Fs24Fw500Black = Typography('Fs24Fw500Black');
export const Fs24Fw400Black = Typography('Fs24Fw400Black');
export const Fs14Fw400Black = Typography('Fs14Fw400Black');
export const Fs14Fw400 = Typography('Fs14Fw400');
export const Fs14Fw500Black = Typography('Fs14Fw500Black');
export const Fs14Fw400White = Typography('Fs14Fw400White');
export const Fs12Fw400Black = Typography('Fs12Fw400Black');
export const Fs12Fw400 = Typography('Fs12Fw400');
export const Fs32Fw600White = Typography('Fs32Fw600White');
export const Fs32Fw600Black = Typography('Fs32Fw600Black');
export const H1SemiboldFs38 = Typography('H1SemiboldFs38').h1;
export const H1SemiboldFs48 = Typography('H1SemiboldFs48').h1;