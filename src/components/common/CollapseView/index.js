import React, {useRef} from 'react'

import useAccordion from 'hooks/useAccordion';

import "./CollapseView.module.css"

const CollapseView = ({summary, children, open = true, contentRef, classNames }) => {
    const detailsRef = useRef();
    const summaryRef = useRef();
    const {toggleAccordion} = useAccordion({detailsRef, summaryRef, contentRef})
    
    return (
       <details ref={detailsRef} open={open}>
           <summary ref={summaryRef} className={classNames?.summary || ""} onClick={toggleAccordion}>{summary}</summary>
           {children}
       </details>
    )
}

export default CollapseView
