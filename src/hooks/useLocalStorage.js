import { useState } from 'react'

export default function useLocalStorage (key, initialValue, handleError) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = value => {
    try {
      const valueToStore =
                value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      handleError ? handleError(error) : console.error(error)
    }
  }

  return [storedValue, setValue]
}
