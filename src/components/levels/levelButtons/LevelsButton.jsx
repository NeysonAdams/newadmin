import React from 'react';
import './LevelsButton.css';

const LevelsButton = ({level, handleClick}) =>
{

    const handleCLickButton = ()=>{
        if (level!= null)
            handleClick(level.id);
        else
            handleClick();
    }

    return (
        <button className="levels-button" onClick={handleCLickButton}>
                {level ? `${level.number} : ${level.language}` : "Добавить"}
            </button>
    );
}

export default LevelsButton;