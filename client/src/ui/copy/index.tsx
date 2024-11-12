import React, { useState } from 'react';
import styles from './copy.module.scss'
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';

interface CopyButtonProps {
    text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleClick = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);

        // Reset the copied state after a short delay (optional)
        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    return (
        <button className={styles.copyButton} onClick={handleClick}>
            {copied ? (
                <>
                    <CheckIcon className={styles.icon} />
                </>
            ) : (
                <>
                    <CopyIcon className={styles.icon} />
                </>
            )}
        </button>
    );
};

export default CopyButton;
