import React, { useRef, useState } from "react";
import "./TestQuestion.css"

const WordsPair = ({words, language, update}) =>
{
    const [currentWords, setCurrentWords] = useState(words.words)

    const handlerQuesyChange = (event) =>
    {
        const key = event.target.key;
        const id = event.target.id;

        if( id==="eng")
            words.words[key].eng = event.target.value;
        else if(id==="other")
        {
            if (language === "ru")
                words.words[key].rus = event.target.value;
            else
                words.words[key].uzb = event.target.value;
        }

        setCurrentWords(words.words);
        update(words);
    }

    const addNewPair = (event) =>
    {
        const pair = {"id": -1, "eng": "", "rus": "", "uzb":""}
        setCurrentWords((prevItems) => [...prevItems, pair])
        words.words.push(pair);
        update(words);
    }

    return (
        <>
            {console.log(currentWords)}
            {Array.isArray(currentWords) && currentWords.length > 0 ?(
                currentWords.map((word, i) => (
                    <div key={i} className="var">
                        <label htmlFor="eng">I: </label>
                        <input
                            id="eng"
                            type="text"
                            value={word.eng}
                            onChange={handlerQuesyChange}
                        /><label htmlFor="other">II: </label>
                        <input
                            id="other"
                            type="text"
                            value={language === "ru" ? word.rus: word.uzb}
                            onChange={handlerQuesyChange}
                        />
                    </div>
                    ))
                ) :
                (
                    <></>
                )}
            <button className="play_button" onClick={addNewPair}>
                    Добавить
            </button>
        </>
    );
}

export default WordsPair;