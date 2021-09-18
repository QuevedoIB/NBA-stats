import Proptypes from 'prop-types'

const BurgerMenu = ({ isOpen, onToggle }) => {
  return (
    <button
      className={`navbar-burguer-menu ${
                isOpen ? 'open-burguer' : 'close-burguer'
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
