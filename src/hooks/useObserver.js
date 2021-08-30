import { useCallback } from 'react';
import { useState, useRef, useEffect } from 'react';

export function useObserver({
    ref,
    options = {},
    keepObserving = false,
    intersectingCallback,
}) {
    const [element, setElement] = useState();
    const [isIntersecting, setIsIntersecting] = useState(false);
    const observer = useRef();

    const removeObserver = () => {
        if (observer.current) {
            observer.current.disconnect();
        }
    };

    const updateObserver = useCallback(() => {
        element && observer.current.observe(element);
    }, [element]);

    useEffect(() => {
        setElement(ref.current);
    }, [ref]);

    useEffect(() => {
        if (!element) return;
        observer.current = new IntersectionObserver(([entry]) => {
            const isElementIntersecting = entry.isIntersecting;
            if (keepObserving) {
                setIsIntersecting(isElementIntersecting);
            } else if (
                !keepObserving &&
                !isIntersecting &&
                isElementIntersecting
            ) {
                setIsIntersecting(isElementIntersecting);
                removeObserver();
            }
            if (isElementIntersecting && intersectingCallback) {
                intersectingCallback();
            }
        }, options);
        updateObserver();
        return () => {
            removeObserver();
        };
    }, [
        element,
        intersectingCallback,
        isIntersecting,
        keepObserving,
        options,
        updateObserver,
    ]);

    return { isIntersecting, updateObserver };
}
