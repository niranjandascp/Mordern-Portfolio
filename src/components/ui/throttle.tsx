// Throttle utility — limits how often a function can be called.
// Reference: https://gist.github.com/coleturner/34396fb826c12fbd88d6591173d178c2
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
    fn: T,
    wait: number
): (...args: Parameters<T>) => void {
    let shouldWait = false;
    return function throttledFunction(...args: Parameters<T>) {
        if (!shouldWait) {
            fn(...args);
            shouldWait = true;
            setTimeout(() => (shouldWait = false), wait);
        }
    };
}

// Hook — returns the [start, end] scroll progress positions of an element.
import { useEffect, useState } from 'react';

export function useElementViewportPosition(ref: React.RefObject<HTMLElement | null>) {
    const [position, setPosition] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
        const pageHeight = document.body.scrollHeight;
        const start = el.offsetTop;
        setPosition([start / pageHeight, (start + el.offsetHeight) / pageHeight]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { position };
}

