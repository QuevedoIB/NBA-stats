import { useState, useRef, useEffect } from 'react'

export default function useObserver ({
  ref,
  options = {},
  keepObserving = false,
  intersectingCallback
}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const observer = useRef()

  const removeObserver = () => {
    if (observer.current) {
      observer.current.disconnect()
    }
  }

  useEffect(() => {
    if (!ref.current) return
    observer.current = new window.IntersectionObserver(([entry]) => {
      const isElementIntersecting = entry.isIntersecting
      if (keepObserving) {
        setIsIntersecting(isElementIntersecting)
      } else if (
        !keepObserving &&
                !isIntersecting &&
                isElementIntersecting
      ) {
        setIsIntersecting(isElementIntersecting)
        removeObserver()
      }
      if (isElementIntersecting && intersectingCallback) {
        intersectingCallback()
      }
    }, options)
    observer.current.observe(ref.current)
    return () => {
      removeObserver()
    }
  }, [intersectingCallback, isIntersecting, keepObserving, options, ref])

  return isIntersecting
}
