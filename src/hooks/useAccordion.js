import { useCallback, useRef } from "react";

export default function useAccordion({ detailsRef, summaryRef }) {
  const animationRef = useRef();
  const isOpening = useRef(false);
  const isClosing = useRef(false);

  const getContent = useCallback(() => {
    if (!detailsRef.current) return;
    return detailsRef.current.querySelector(
      `:scope > :not(#${summaryRef.current.id})`
    );
  }, [detailsRef, summaryRef]);

  const getAnimationDuration = useCallback((start, end) => {
    return (start > end ? start - end : end - start) / 2;
  }, []);

  const generateAnimation = useCallback(
    ({ start, end, statusRef }) => {
      const animation = detailsRef.current.animate(
        {
          height: [`${start}px`, `${end}px`],
        },
        {
          duration: Math.max(getAnimationDuration(start, end), 400),
          easing: "ease-out",
        }
      );
      animation.onfinish = () => {
        animationRef.current = null;
        detailsRef.current.open = isOpening.current;
        isClosing.current = false;
        isOpening.current = false;
        detailsRef.current.style.height = "";
        detailsRef.current.style.overflow = "";
      };
      animation.oncancel = () => (statusRef.current = false);
      animationRef.current = animation;
    },
    [detailsRef, getAnimationDuration]
  );

  const handleClose = useCallback(() => {
    isClosing.current = true;
    if (!detailsRef.current.style.width) {
      detailsRef.current.style.width = `${getContent()?.offsetWidth}px`;
    }
    generateAnimation({
      start: detailsRef.current.offsetHeight,
      end: summaryRef.current.offsetHeight,
      statusRef: isClosing,
    });
  }, [detailsRef, generateAnimation, getContent, summaryRef]);

  const handleOpen = useCallback(() => {
    isOpening.current = true;
    detailsRef.current.style.height = `${detailsRef.current.offsetHeight}px`;
    detailsRef.current.open = true;

    window.requestAnimationFrame(() =>
      generateAnimation({
        start: detailsRef.current.offsetHeight,
        end: summaryRef.current.offsetHeight + getContent()?.offsetHeight,
        statusRef: isOpening,
      })
    );
  }, [detailsRef, generateAnimation, getContent, summaryRef]);

  const toggleAccordion = useCallback(
    (e) => {
      if (!getContent()) return;
      e.preventDefault();
      detailsRef.current.style.overflow = "hidden";

      if (animationRef.current) {
        animationRef.current.reverse();
        isClosing.current = !isClosing.current;
        isOpening.current = !isOpening.current;
      } else {
        if (
          isOpening.current ||
          (detailsRef.current.open && !isClosing.current)
        ) {
          handleClose();
        } else {
          handleOpen();
        }
      }
    },
    [detailsRef, getContent, handleClose, handleOpen]
  );

  return { toggleAccordion };
}
