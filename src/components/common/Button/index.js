import React from 'react'
import Proptypes from 'prop-types'

import './Button.css'

const Button = ({
  role = 'primary',
  onClick,
  type = 'button',
  text,
  classes = '',
  children
}) => {
  return (
    <button
      className={`button-container button-${role} ${classes}`}
      type={type}
      onClick={onClick}
    >
      {children || text}
    </button>
  )
}

Button.propTypes = {
  role: Proptypes.oneOf(['primary', 'secondary']).isRequired,
  onClick: Proptypes.func.isRequired,
  type: Proptypes.oneOf(['button, submit']).isRequired,
  text: Proptypes.string,
  classes: Proptypes.string,
  children: Proptypes.elementType
}

export default Button
