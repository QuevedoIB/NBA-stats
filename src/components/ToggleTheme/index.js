import React from 'react'

import useDarkMode from 'hooks/useDarkMode'

import './ToggleTheme.css'

const ToggleTheme = () => {
  const [theme, toggleTheme] = useDarkMode()

  return (
    <div id='theme-container'>
      <input
        type='checkbox'
        id='theme-toggle'
        defaultChecked={theme === 'dark'}
        onClick={toggleTheme}
      />
      <div className='sun-circle' />
      <div className='crescent' />
    </div>
  )
}

export default ToggleTheme
