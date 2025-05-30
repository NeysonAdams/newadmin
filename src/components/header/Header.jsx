import React from 'react';
import './Header.css'; 
import { MenuEnum } from '../../utils/constants';

const Header = ({ username, onLogout, activeMenu, handleMenuClick }) => {



    return (
        <header className="header">
            <div className="header-left">
                <span className="username">{username}</span>
            </div>
            <nav className="header-right">
                <ul className="nav-menu">
                    
                    <li className={`nav-item ${activeMenu === MenuEnum.LEVELS ? 'active' : ''}`}
                        onClick={() => handleMenuClick(MenuEnum.LEVELS)}>
                        Уровни
                        </li>
                    <li className={`nav-item ${activeMenu === MenuEnum.EXESIZES ? 'active' : ''}`}
                        onClick={() => handleMenuClick(MenuEnum.EXESIZES)}>
                        Задания
                        </li>
                </ul>
                <button className="logout-button" onClick={onLogout}>Выйти</button>
            </nav>
        </header>
    );
};

export default Header;