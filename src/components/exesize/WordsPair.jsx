import React, { useState } from "react";
import "./TestQuestion.css";

const WordsPair = ({ words, language, update }) => {
    const [currentWords, setCurrentWords] = useState([...words.words]);

    const handleWordChange = (index, field, value) => {
        const updatedWords = [...currentWords];
        if (field === "eng") {
            updatedWords[index].eng = value;
        } else if (field === "other") {
            if (language === "ru") {
                updatedWords[index].rus = value;
            } else {
                updatedWords[index].uzb = value;
            }
        }

        setCurrentWords(updatedWords);
        update({ ...words, words: updatedWords });
    };

    const addNewPair = () => {
        const newPair = { id: -1, eng: "", rus: "", uzb: "" };
        const updatedWords = [...currentWords, newPair];
        setCurrentWords(updatedWords);
        update({ ...words, words: updatedWords });
    };

    return (
        <>
            {Array.isArray(currentWords) && currentWords.length > 0 &&
                currentWords.map((word, i) => (
                    <div key={i} className="var">
                        <label htmlFor={`eng-${i}`}>I: </label>
                        <input
                            id={`eng-${i}`}
                            type="text"
                            value={word.eng}
                            onChange={(e) => handleWordChange(i, "eng", e.target.value)}
                        />
                        <label htmlFor={`other-${i}`}>II: </label>
                        <input
                            id={`other-${i}`}
                            type="text"
                            value={language === "ru" ? word.rus : word.uzb}
                            onChange={(e) => handleWordChange(i, "other", e.target.value)}
                        />
                    </div>
                ))}
            <button className="play_button" onClick={addNewPair}>
                Добавить
            </button>
        </>
    );
};

export default WordsPair;
