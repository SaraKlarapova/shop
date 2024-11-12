import { AnimatePresence, motion } from 'framer-motion';
import React, { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
    isVisible: boolean
}

export const DropInAnimation = ({ isVisible, children, className }: Props) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={className}>
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
