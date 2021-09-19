import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { generalRoutes } from 'routes'

const RoutesList = () => {
  const [t] = useTranslation()
  return (
    <ul className='navbar-menu-link-container centered-container'>
      {Object.values(generalRoutes).flatMap(({ path, label }) =>
        label ? (
          <li key={path}>
            <NavLink
              to={path}
              activeClassName='navbar-menu-selected-link'
              className='navbar-menu-link'
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
