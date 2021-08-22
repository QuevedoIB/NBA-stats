import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ToggleTheme from 'components/buttons/ToggleTheme';
import BurgerMenu from 'components/Navbar/BurgerMenu';
import BasketBall from 'components/common/BasketBall.js';

import { generalRoutes } from 'routes';
import useWindowSize from 'hooks/useWindowSize';

import './Navbar.css';

const Navbar = () => {
    const [t] = useTranslation();
    const [openSideNav, setOpenSideNav] = useState(false);
    const handleMenuOpen = () => setOpenSideNav(!openSideNav);
    const { width } = useWindowSize();

    return (
        <nav className="navbar">
            <NavLink to={generalRoutes.home.path}>
                <div style={{ position: 'relative' }}>
                    <h1 className="navbar-title">{t('title')}</h1>
                    <BasketBall />
                </div>
            </NavLink>

            <div className="centered-container">
                <ToggleTheme />
                {width > 768 ? (
                    <ul className="navbar-menu-link-container centered-container">
                        {Object.values(generalRoutes).flatMap(
                            ({ path, label }) =>
                                label ? (
                                    <li key={path}>
                                        <NavLink
                                            to={path}
                                            activeClassName="navbar-menu-selected-link"
                                            className="navbar-menu-link"
                                        >
                                            {label}
                                        </NavLink>
                                    </li>
                                ) : (
                                    []
                                )
                        )}
                    </ul>
                ) : (
                    <BurgerMenu
                        isOpen={openSideNav}
                        onToggle={handleMenuOpen}
                    />
                )}
            </div>
        </nav>
    );
};

export default Navbar;
