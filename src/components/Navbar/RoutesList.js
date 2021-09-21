import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { generalRoutes } from 'routes'

import styles from "./Navbar.module.css"

const RoutesList = () => {
  const [t] = useTranslation()
  return (
    <ul className={`${styles.linksList} centered-container`}>
      {Object.values(generalRoutes).flatMap(({ path, label }) =>
        label ? (
          <li key={path}>
            <NavLink
              to={path}
              activeClassName={styles.selectedLink}
            >
              {t(`routes.${label}`)}
            </NavLink>
          </li>
        ) : (
          []
        )
      )}
    </ul>
  )
}

export default RoutesList
