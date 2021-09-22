import { useReducer,useCallback } from "react";

const RESET_ANIMATION = "RESET_ANIMATION";
const SET_ANIMATION = "SET_ANIMATION";

const initialAccordionState = {
    animation: null,
    expanded: true,
    isClosing: false,
    isOpening: false
}

const accordionReducer = (state, {type, payload}) => {
    switch (type) {
        case RESET_ANIMATION: return {...state, animation: initialAccordionState.animation};
        case SET_ANIMATION: return {...state, animation: payload.animation, status: payload.status};
        default: return state
    }
}

export default function useAccordion({detailsRef, summaryRef, contentRef}) {
    const [{expanded, animation, isOpening, isClosing}, dispatch] = useReducer(accordionReducer, initialAccordionState);

    const generateAnimation = useCallback(({start, end, closing = false, opening = false, duration = 400}) => {
        console.log(duration, "DURATION")
        const animation = detailsRef.current.animate({
            height: [start, end]
          }, {
            duration,
            easing: 'ease-out',
          });
          animation.onfinish = () => {dispatch({type: RESET_ANIMATION}); detailsRef.current.open = opening};
          animation.oncancel = () => dispatch({type: RESET_ANIMATION});
          return animation;
    },[detailsRef])

const handleClose = useCallback(() => {
    const start = `${detailsRef.current.offsetHeight}px`;
    const end = `${summaryRef.current.offsetHeight}px`;
    
    const newAnimation = generateAnimation({start,end, duration: detailsRef.current.offsetHeight - summaryRef.current.offsetHeight / 2});

    console.log(start, end, newAnimation)

    dispatch({type: SET_ANIMATION, payload: {animation: newAnimation, status: false}})
  
},[detailsRef, generateAnimation, summaryRef])

const handleOpen = useCallback(() => {
    const start = `${detailsRef.current.offsetHeight}px`;
    const end = `${summaryRef.current.offsetHeight + contentRef.current.offsetHeight}px`;
    
    const newAnimation = generateAnimation({start,end});
    window.requestAnimationFrame(() => newAnimation);

    console.log(start, end, newAnimation)
    
    dispatch({type: SET_ANIMATION, payload: {animation: newAnimation, status: true}})
},[contentRef, detailsRef, generateAnimation, summaryRef])

    const toggleAccordion = useCallback((e) => {
        e.preventDefault();

        if (animation) {
            animation.cancel();
        }

        if (isOpening || expanded) {
            console.log("close")
            handleClose()
        } else if (isClosing || !expanded) {
            console.log("open")
            handleOpen()
        }

    },[animation, expanded, handleClose, handleOpen, isClosing, isOpening])

    return {toggleAccordion, expanded}
}

// class Accordion {
//     constructor(el) {
//       // Store the <details> element
//       this.el = el;
//       // Store the <summary> element
//       this.summary = el.querySelector('summary');
//       // Store the <div class="content"> element
//       this.content = el.querySelector('.content');
  
//       // Store the animation object (so we can cancel it if needed)
//       this.animation = null;
//       // Store if the element is closing
//       this.isClosing = false;
//       // Store if the element is expanding
//       this.isExpanding = false;
//       // Detect user clicks on the summary element
//       this.summary.addEventListener('click', (e) => this.onClick(e));
//     }
  
//     onClick(e) {
//       // Stop default behaviour from the browser
//       e.preventDefault();
//       // Add an overflow on the <details> to avoid content overflowing
//       this.el.style.overflow = 'hidden';
//       // Check if the element is being closed or is already closed
//       if (this.isClosing || !this.el.open) {
//         this.open();
//       // Check if the element is being openned or is already open
//       } else if (this.isExpanding || this.el.open) {
//         this.shrink();
//       }
//     }
  
//     shrink() {
//       // Set the element as "being closed"
//       this.isClosing = true;
      
//       // Store the current height of the element
//       const startHeight = `${this.el.offsetHeight}px`;
//       // Calculate the height of the summary
//       const endHeight = `${this.summary.offsetHeight}px`;
      
//       // If there is already an animation running
//       if (this.animation) {
//         // Cancel the current animation
//         this.animation.cancel();
//       }
      
//       // Start a WAAPI animation
//       this.animation = this.el.animate({
//         // Set the keyframes from the startHeight to endHeight
//         height: [startHeight, endHeight]
//       }, {
//         duration: 400,
//         easing: 'ease-out'
//       });
      
//       // When the animation is complete, call onAnimationFinish()
//       this.animation.onfinish = () => this.onAnimationFinish(false);
//       // If the animation is cancelled, isClosing variable is set to false
//       this.animation.oncancel = () => this.isClosing = false;
//     }
  
//     open() {
//       // Apply a fixed height on the element
//       this.el.style.height = `${this.el.offsetHeight}px`;
//       // Force the [open] attribute on the details element
//       this.el.open = true;
//       // Wait for the next frame to call the expand function
//       window.requestAnimationFrame(() => this.expand());
//     }
  
//     expand() {
//       // Set the element as "being expanding"
//       this.isExpanding = true;
//       // Get the current fixed height of the element
//       const startHeight = `${this.el.offsetHeight}px`;
//       // Calculate the open height of the element (summary height + content height)
//       const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;
      
//       // If there is already an animation running
//       if (this.animation) {
//         // Cancel the current animation
//         this.animation.cancel();
//       }
      
//       // Start a WAAPI animation
//       this.animation = this.el.animate({
//         // Set the keyframes from the startHeight to endHeight
//         height: [startHeight, endHeight]
//       }, {
//         duration: 400,
//         easing: 'ease-out'
//       });
//       // When the animation is complete, call onAnimationFinish()
//       this.animation.onfinish = () => this.onAnimationFinish(true);
//       // If the animation is cancelled, isExpanding variable is set to false
//       this.animation.oncancel = () => this.isExpanding = false;
//     }
  
//     onAnimationFinish(open) {
//       // Set the open attribute based on the parameter
//       this.el.open = open;
//       // Clear the stored animation
//       this.animation = null;
//       // Reset isClosing & isExpanding
//       this.isClosing = false;
//       this.isExpanding = false;
//       // Remove the overflow hidden and the fixed height
//       this.el.style.height = this.el.style.overflow = '';
//     }
//   }
  
//   document.querySelectorAll('details').forEach((el) => {
//     new Accordion(el);
//   });
  