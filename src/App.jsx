import { useState, useEffect } from "react";

import { getCurrentUser, login, getAllLevels } from './utils/api'
import { MenuEnum } from "./utils/constants";

import './App.css'

import AuthPopup from './components/login/AuthPopup'
import Header from "./components/header/Header";
import Main from "./components/main/Main";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [levelsList, setLevelsList] = useState({});

  const [activeMenu, setActiveMenu] = useState(MenuEnum.NONE);

  const updateLevels = (newLevel) => {
    setLevelsList([...levelsList, newLevel]); // Добавление нового уровня
};  

const refreshList = (data) =>
{
  setLevelsList(null);
  const timeoutId = setTimeout(() => {
    setLevelsList(data);
  }, 10);
  
}

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getCurrentUser()
        .then((res) => {
          setCurrentUser(res);

          localStorage.setItem("jwt", res["access_token"]);
          localStorage.setItem("refresh", res["refresh_token"]);

          setLoggedIn(true);
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);

  const handleOnLogin = (data) => {
    login(data)
      .then((res) => {
        setCurrentUser(res);

          localStorage.setItem("jwt", res["access_token"]);
          localStorage.setItem("refresh", res["refresh_token"]);


          setLoggedIn(true);
      })
      .catch(console.error);
  };

  const handleLogOut = () =>
  {
    setCurrentUser({});
    localStorage.removeItem("jwt");
    localStorage.removeItem("refresh");
    setLoggedIn(false);
  }

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    //console.log(`Active menu changed to: ${menu}`); // Отладочный вывод

    if (menu == MenuEnum.LEVELS)
    {
      getAllLevels().then((res)=>{
        setLevelsList(res);
        //console.log(res);
      })
    }
};

const refreshListBYRequest = () =>
{
  getAllLevels().then((res)=>{
    setLevelsList(res);
    //console.log(res);
  })
}

  return (
    <>
      {!isLoggedIn && (
        <AuthPopup 
        handleLogin={handleOnLogin}
      />)}

      {isLoggedIn && (
        <>
          <Header
            username={currentUser.name}
            onLogout={handleLogOut}
            activeMenu={activeMenu}
            handleMenuClick={handleMenuClick}
          />
          
          <Main activeMenu={activeMenu} levels={levelsList} updateLevels={updateLevels} refreshList={refreshList} refreshListBYRequest={refreshListBYRequest}/>
        </>
      )}

      
      
    </>
  )
}

export default App
