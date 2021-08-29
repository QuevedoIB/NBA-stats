import { useState, useRef, useEffect } from 'react';

export function useObserver(ref, options = {}, keepObserving = false) {
    const [element, setElement] = useState();
    const [isIntersecting, setIsIntersecting] = useState(false);
    const observer = useRef();

    const removeObserver = () => {
        if (observer.current) {
            observer.current.disconnect();
        }
    };

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
        }, options);
        observer.current.observe(element);
        return () => {
            removeObserver();
        };
    }, [element, isIntersecting, keepObserving, options]);

    return isIntersecting;
}
