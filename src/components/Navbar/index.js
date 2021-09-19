import React, { useState, useCallback, useEffect } from 'react'

import { NavLink, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import LanguageSelector from 'components/LanguageSelector'
import ToggleTheme from 'components/ToggleTheme'
import BurgerMenu from 'components/Navbar/BurgerMenu'
import BasketBall from 'components/common/BasketBall.js'
import RoutesList from 'components/Navbar/RoutesList'

import { generalRoutes } from 'routes'
import useWindowSize from 'hooks/useWindowSize'

import styles from './Navbar.module.css'

const Navbar = () => {
  const [t] = useTranslation()
  const [openSideNav, setOpenSideNav] = useState(false)
  const handleMenuOpen = useCallback(
    () => setOpenSideNav(currentState => !currentState),
    []
  )
  const { width } = useWindowSize()
  const history = useHistory()

  useEffect(() => {
    const removeRouteListener = history.listen(() => {
      setOpenSideNav(false)
    })
    return () => {
      removeRouteListener()
    }
  }, [history])

  return (
    <nav className={styles.container}>
      <NavLink to={generalRoutes.home.path}>
        <div style={{ position: 'relative' }}>
          <h1 className={styles.title}>{t('title')}</h1>
          <BasketBall />
        </div>
      </NavLink>

      <div className='centered-container'>
        <LanguageSelector />
        <ToggleTheme />
        {width > 768
          ? (
            <RoutesList />
            )
          : (
            <>
              <BurgerMenu
                isOpen={openSideNav}
                onToggle={handleMenuOpen}
              />
              <div
                className={`${styles.sideMenu} ${
                                openSideNav ? 'open' : ''
                            }`}
              >
                <RoutesList />
              </div>
            </>
            )}
      </div>
    </nav>
  )
}

export default Navbar
