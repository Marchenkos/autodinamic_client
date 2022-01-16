import { useEffect } from 'react';

export const useListenScroll = (handler: () => void): void => {
    useEffect(() => {
        const unsubscribe = window.addEventListener('scroll', handler);

        return unsubscribe;
    }, [handler]);
};
