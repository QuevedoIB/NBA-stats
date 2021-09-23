import { useReducer, useCallback } from "react";

const RESET_ANIMATION = "RESET_ANIMATION";
const SET_ANIMATION = "SET_ANIMATION";

const initialAccordionState = {
  animation: null,
  expanded: true,
};

const accordionReducer = (state, { type, payload = {} }) => {
  switch (type) {
    case RESET_ANIMATION:
      return {
        ...state,
        animation: null,
        ...payload,
      };
    case SET_ANIMATION:
      return { ...state, animation: payload };
    default:
      return state;
  }
};

export default function useAccordion({ detailsRef, summaryRef, contentRef }) {
  const [{ expanded, animation}, dispatch] = useReducer(
    accordionReducer,
    initialAccordionState
  );

  const getAnimationDuration = useCallback((start, end) => {
    return (start > end ? start - end : end - start) / 2;
  }, []);

  const generateAnimation = useCallback(
    ({ start, end, opening = false }) => {
      const animation = detailsRef.current.animate(
        {
          height: [`${start}px`, `${end}px`],
        },
        {
          duration: 500,
          easing: "ease-out",
        }
      );
      animation.onfinish = () => {
        dispatch({ type: RESET_ANIMATION, payload: { expanded: opening } });
        detailsRef.current.open = opening;
        detailsRef.current.style.height = "";
        detailsRef.current.style.overflow = "";
      };
      animation.oncancel = () => dispatch({ type: RESET_ANIMATION });
      dispatch({
        type: SET_ANIMATION,
        payload: animation
      });
      console.log("ANIMATION", start, end, opening);
      return animation;
    },
    [detailsRef]
  );

  const handleClose = useCallback(() => {
    window.requestAnimationFrame(() =>
      generateAnimation({
        start: detailsRef.current.offsetHeight,
        end: summaryRef.current.offsetHeight,
      })
    );
  }, [detailsRef, generateAnimation, summaryRef]);

  const handleOpen = useCallback(() => {
    detailsRef.current.style.height = `${detailsRef.current.offsetHeight}px`;
    detailsRef.current.open = true;

    window.requestAnimationFrame(() =>
      generateAnimation({
        start: detailsRef.current.offsetHeight,
        end: summaryRef.current.offsetHeight + contentRef.current.offsetHeight,
        opening: true,
      })
    );
  }, [contentRef, detailsRef, generateAnimation, summaryRef]);

  const toggleAccordion = useCallback(
    (e) => {
      e.preventDefault();
      detailsRef.current.style.overflow = "hidden";

      if (animation) {
        animation.cancel();
        dispatch({type: RESET_ANIMATION})
      }

      if ((animation && !expanded) || expanded) {
        handleClose();
      } else {
        handleOpen();
      }
    },
    [animation, detailsRef, expanded, handleClose, handleOpen]
  );

  return { toggleAccordion, expanded };
}
