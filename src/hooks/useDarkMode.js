import { useEffect, useMemo } from 'react'
import useLocalStorage from 'hooks/useLocalStorage'

export default function useDarkMode () {
  const [theme, setTheme] = useLocalStorage(
    'theme',
    window?.matchMedia('(prefers-color-scheme: dark)')?.matches || 'light'
  )

  const body = useMemo(() => document.querySelector('body'), [])

  useEffect(() => {
    if (theme === 'dark') {
      body.classList.add('theme-dark')
    } else {
      body.classList.remove('theme-dark')
    }
  }, [body.classList, theme])

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return [theme, toggleTheme]
}
