const BurgerMenu = ({ isOpen, onToggle }) => {
    return (
        <button
            className={`navbar-burguer-menu ${
                isOpen ? 'open-burguer' : 'close-burguer'
            }`}
            onClick={onToggle}
        >
            <div>
                <span></span>
            </div>
            <div>
                <span></span>
            </div>
            <div>
                <span></span>
            </div>
        </button>
    );
};

export default BurgerMenu;
