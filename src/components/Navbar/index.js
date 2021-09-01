import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LanguageSelector from 'components/LanguageSelector';
import ToggleTheme from 'components/ToggleTheme';
import BurgerMenu from 'components/Navbar/BurgerMenu';
import BasketBall from 'components/common/BasketBall.js';
import RoutesList from 'components/Navbar/RoutesList';

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
                <LanguageSelector />
                <ToggleTheme />
                {width > 768 ? (
                    <RoutesList />
                ) : (
                    <>
                        <BurgerMenu
                            isOpen={openSideNav}
                            onToggle={handleMenuOpen}
                        />
                        <div
                            className={`navbar-side-menu ${
                                openSideNav ? 'open' : ''
                            }`}
                        >
                            <RoutesList />
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
