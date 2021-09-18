import React from 'react'
import Proptypes from 'prop-types'

const Layout = ({ children }) => {
  return <div className='layout-container'>{children}</div>
}

Layout.propTypes = {
  children: Proptypes.oneOfType([
    Proptypes.node,
    Proptypes.arrayOf(Proptypes.node)
  ])
}

export default Layout
