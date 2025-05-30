import React from "react";
import { useState } from "react";
import "./Levels.css";
import LevelsButton from "./levelButtons/LevelsButton";
import CurrentLevel from "./current/CurrentLevel";
import { getLevelById } from "../../utils/api";

const Levels = ({levels, updateLevels, refreshList, refreshListBYRequest}) => {

    const [currentLevel, setCurrentLevel] = useState(null);

    const handleLevelClick = (id) => 
    {
      setCurrentLevel(null);
        getLevelById(id)
            .then((res) => {
                setCurrentLevel(res);
            })
            .catch((error) => {
              console.error('Ошибка при получении уровня:', error);
            });
    }

    const handleAddLevel = () =>{
        setCurrentLevel(null);
        const timeoutId = setTimeout(() => {
          const level = {
            id : -1,
            number: 0,
            language :"ru",
            exesizes: []
          }
          setCurrentLevel(level);
        }, 100);
        
    }

    const updateLevel = (update, is_wait=false, is_update = false) =>
    {
      if (is_wait)
      {
        setCurrentLevel(null);
        if(update !=null && update.id!= -1 && is_update){
          handleLevelClick(update.id);
        }
        else {
        const timeoutId = setTimeout(() => {
            setCurrentLevel(update);
          }, 10);
        }

      
      }else{
          setCurrentLevel(update);
      }
    }

    const updateLevelList = (data) =>
    {
      refreshList(data)
    }

    const refresher = ()=>
    {
      refreshListBYRequest();
    }

    return (
      <div className="container">
        <div className="left-pane">
          <div className="content">
            <div className="header-with-button">
                <h3>Уровни</h3>
                <button className="add-button" onClick={handleAddLevel}>+</button>
            </div>
            {Array.isArray(levels) && levels.length > 0 ? (
                        levels.map((level, i) => (
                            <LevelsButton key={i} level={level} handleClick={handleLevelClick} />
                        ))
                    ) : (
                        <p>Нет доступных уровней</p>
                    )}
            <LevelsButton level={null} handleClick={handleAddLevel}/>
          </div>
        </div>
        <div className="right-pane">
                {currentLevel != null ? (
                    <CurrentLevel level={currentLevel} updateLevel={updateLevel} updateLevelsList={updateLevelList} refreshListBYRequest={refresher}/>
                ) : (
                    <p>Выберете уроверь или создайте 
                        <LevelsButton level={null} handleClick={handleAddLevel}/>
                    </p>
                )}
          <div className="content">
            
          </div>
        </div>
      </div>
    );
  };
  
  export default Levels;