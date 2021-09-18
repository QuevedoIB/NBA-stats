import React, { useEffect, useState, useCallback } from 'react'

import './ScrollToTop.css'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  const updateVisibility = useCallback(() => {
    if (
      document.documentElement.scrollTop >
            document.documentElement.clientHeight
    ) {
      setVisible(true)
    }

    if (
      document.documentElement.scrollTop <=
            document.documentElement.clientHeight
    ) {
      setVisible(false)
    }
  }, [])

  const onScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', updateVisibility)
    return () => {
      window.removeEventListener('scroll', updateVisibility)
    }
  }, [updateVisibility])

  return (
    visible && (
      <button
        className='scroll-to-top-container centered-container'
        onClick={onScrollToTop}
      >
        <span>&#8593;</span>
      </button>
    )
  )
}

export default ScrollToTop
