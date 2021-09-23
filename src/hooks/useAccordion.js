import { useCallback, useRef } from "react";

export default function useAccordion({ detailsRef, summaryRef, contentRef }) {
  const animationRef = useRef();
  const isOpening = useRef(false);
  const isClosing = useRef(false);

  const getAnimationDuration = useCallback((start, end) => {
    return (start > end ? start - end : end - start) / 4;
  }, []);

  const generateAnimation = useCallback(
    ({ start, end, statusRef }) => {
      const animation = detailsRef.current.animate(
        {
          height: [`${start}px`, `${end}px`],
        },
        {
          duration: getAnimationDuration(start, end) || 1000,
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
    generateAnimation({
      start: detailsRef.current.offsetHeight,
      end: summaryRef.current.offsetHeight,
      statusRef: isClosing,
    });
  }, [detailsRef, generateAnimation, summaryRef]);

  const handleOpen = useCallback(() => {
    isOpening.current = true;
    detailsRef.current.style.height = `${detailsRef.current.offsetHeight}px`;
    detailsRef.current.open = true;

    window.requestAnimationFrame(() =>
      generateAnimation({
        start: detailsRef.current.offsetHeight,
        end: summaryRef.current.offsetHeight + contentRef.current.offsetHeight,
        statusRef: isOpening,
      })
    );
  }, [contentRef, detailsRef, generateAnimation, summaryRef]);

  const toggleAccordion = useCallback(
    (e) => {
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
    [detailsRef, handleClose, handleOpen]
  );

  return { toggleAccordion };
}
