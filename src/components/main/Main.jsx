import React from 'react';
import { MenuEnum } from '../../utils/constants'; // Импорт перечисления из Header
import './Main.css';

import Levels from '../levels/Levels';

const Main = ({ activeMenu, levels, updateLevels, refreshList, refreshListBYRequest}) => {

    const refresher = () =>
    {
        refreshListBYRequest()
    }

    return (
        <main className="main-content">
            {activeMenu === MenuEnum.USERS && (
                <div className="content-section">
                    <h1>Пользователи</h1>
                    <p>Здесь отображается информация о пользователях.</p>
                </div>
            )}
            {activeMenu === MenuEnum.LEVELS && (
                 (!levels || levels.length === 0) ? (
                    <div className="content-section">
                        <h1>Уровни</h1>
                        <p>Здесь отображается информация об уровнях.</p>
                    </div>
                ) : (
                    <Levels levels={levels} updateLevels={updateLevels} refreshList={refreshList} refreshListBYRequest={refresher}/>
                )
                
            )}
            {activeMenu === MenuEnum.EXESIZES && (
                <div className="content-section">
                    <h1>Задания</h1>
                    <p>Здесь отображается информация об Заданиях.</p>
                </div>
            )}
            {activeMenu === MenuEnum.SUBSCRIPTIONS && (
                <div className="content-section">
                    <h1>Подписки</h1>
                    <p>Здесь отображается информация об подписках.</p>
                </div>
            )}
        </main>
    );
};

export default Main;