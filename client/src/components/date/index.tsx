import React from 'react'
import styles from './index.module.scss'


export function getRelativeTime(date: Date) {
    const now = new Date();
    const diff = Math.round((now.getTime() - date.getTime()) / 1000); // Difference in seconds

    if (diff < 60) {
        return diff + ' seconds ago';
    } else if (diff < 60 * 60) {
        const minutes = Math.floor(diff / 60);
        return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
    } else if (diff < 60 * 60 * 24) {
        const hours = Math.floor(diff / (60 * 60));
        return hours + (hours === 1 ? ' hour ago' : ' hours ago');
    } else if (diff < 60 * 60 * 24 * 7) {
        const days = Math.floor(diff / (60 * 60 * 24));
        return days + (days === 1 ? ' day ago' : ' days ago');
    } else {
        // Use a library like moment.js for more complex date formatting
        return date.toDateString();
    }
}