import Proptypes from 'prop-types'

import styles from './Navbar.module.css'

const BurgerMenu = ({ isOpen, onToggle }) => {
  return (
    <button
      className={`${styles.burguerMenu} ${
                isOpen ? styles.open : styles.close
            }`}
      onClick={onToggle}
    >
      <div>
        <span />
      </div>
      <div>
        <span />
      </div>
      <div>
        <span />
      </div>
    </button>
  )
}

BurgerMenu.propTypes = {
  isOpen: Proptypes.bool.isRequired,
  onToggle: Proptypes.func.isRequired
}

export default BurgerMenu
