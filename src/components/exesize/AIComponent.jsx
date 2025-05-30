import React, { useRef, useState, useEffect } from "react";
import "./AIComponent.css";

import { getPrompt, savePrompt } from "../../utils/api";

const AIComponent = ({})=>
{
    const [isContentVisible, setIsContentVisible] = useState(false);

    const [testPrompt, setTestPrompt] = useState("");
    const [audioPrompt, setAudioPrompt] = useState("");
    const [textPrompt, setTextPrompt] = useState("");
    const [wpPrompt, setpPrompt] = useState("");

    const [currentPromptType, setCurrentPromptType] = useState("test_button");

    const toggleContentVisibility = () => {
        setIsContentVisible(!isContentVisible);
    };

    useEffect(() => {
        if (isContentVisible) {
          getPrompt()
          .then((data)=>
        {
            console.log(data);
            setTestPrompt(data["test_prompt"]);
            setAudioPrompt(data["audio_prompt"]);
            setTextPrompt(data["text_prompt"]);
            setpPrompt(data["wp_prompt"]);
        })
        .catch(console.error);
        }
      }, [isContentVisible]);

    const swithcPromptTypeHandler = (event) =>
    {
        setCurrentPromptType(event.target.id);
    }

    const getPromptContent = () =>
    {
        if (currentPromptType == "test_button")
            return testPrompt;
        if (currentPromptType == "audio_button")
            return audioPrompt;
        if (currentPromptType == "text_button")
            return textPrompt;
        if (currentPromptType == "wp_button")
            return wpPrompt;
    }

    const saweHandler = (event) =>
    {
        responce = {test_prompt:testPrompt, audio_prompt:audioPrompt, text_prompt:textPrompt, wp_prompt:wpPrompt}
        savePrompt(responce)
        .then((data)=>{
            console.log(data);
            setTestPrompt(data["test_prompt"]);
            setAudioPrompt(data["audio_prompt"]);
            setTextPrompt(data["text_prompt"]);
            setpPrompt(data["wp_prompt"]);
        })
        .catch(console.error);
    }

    const onTextAreaChangeHandler = (event)=>
    {
        if (currentPromptType == "test_button")
            setTestPrompt(event.target.value);
        if (currentPromptType == "audio_button")
            setAudioPrompt(event.target.value);
        if (currentPromptType == "text_button")
            setTextPrompt(event.target.value);
        if (currentPromptType == "wp_button")
            setpPrompt(event.target.value);
    }

    return (
        <div className="ai-component">
      {/* Header Section */}
      <div className="ai-header" onClick={toggleContentVisibility}>
        <span>ИИ Настройка</span>
        <span className="arrow">{isContentVisible ? '▲' : '▼'}</span>
      </div>
      
      {/* Content Section */}
      {isContentVisible && (
        <div className="ai-content">
            {/* Part 1: Buttons */}
            <div className ="ai-buttons" onClick={swithcPromptTypeHandler}>
                <button className={ (currentPromptType=="test_button")  ? "ai-type-button-handler" : ""} id = "test_button" onClick={swithcPromptTypeHandler}>Тест</button>
                <button className={ (currentPromptType=="audio_button") ? "ai-type-button-handler" : ""} id = "audio_button" onClick={swithcPromptTypeHandler}>Аудио</button>
                <button className={ (currentPromptType=="text_button")  ? "ai-type-button-handler" : ""} id = "text_button" onClick={swithcPromptTypeHandler}>Текстовый</button>
                <button className={ (currentPromptType=="wp_button")    ? "ai-type-button-handler" : ""} id = "wp_button" onClick={swithcPromptTypeHandler}>Слова-Пары</button>
            </div>

            {/* Part 2: Text Input */}
            <div className="ai-textarea">
                <textarea 
                style={{ width: '100%', height: '300px', overflowY: 'scroll' }} 
                value={getPromptContent()} 
                onChange={onTextAreaChangeHandler}/>
            </div>

            {/* Part 3: Save Button */}
            <div className="ai-save-button">
                <button onClick={saweHandler}>Сохранить</button>
            </div>
            </div>
            )}
        </div>
    );
}

export default AIComponent;