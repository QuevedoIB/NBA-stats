import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ToggleTheme from 'components/buttons/ToggleTheme';
import BurgerMenu from 'components/Navbar/BurgerMenu';

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
            <h1>{t('title')}</h1>
            <ToggleTheme />
            {width > 768 ? (
                <ul>
                    {Object.values(generalRoutes).map(({ path }) => (
                        <NavLink key={path} to={path}>
                            TEXT
                        </NavLink>
                    ))}
                </ul>
            ) : (
                <BurgerMenu isOpen={openSideNav} onToggle={handleMenuOpen} />
            )}
        </nav>
    );
};

export default Navbar;
