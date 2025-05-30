import React, { useRef, useState } from "react";
import "./TestQuestion.css"


const TextQuestion = ({inputquestion, updateInput}) =>
{
    const [currentInput, setCurrentInput] = useState(inputquestion);

    const handleQuestionChange = (event) =>
    {
        inputquestion.question = event.target.value;
        setCurrentInput(inputquestion);
        updateInput(inputquestion);
    }

    const handleAnswerionChange = (event) =>
    {
        inputquestion.answer = event.target.value;
        setCurrentInput(inputquestion);
        updateInput(inputquestion);
    }

    const handleTypeChange = (event) =>
    {
        inputquestion.type = event.target.value;
        setCurrentInput(inputquestion);
        updateInput(inputquestion);
    }

    const handleToggle = (event) => {
        inputquestion.isrecord = event.target.checked;
        setCurrentInput(inputquestion);
        updateInput(inputquestion);
    }

    return (
        <> {currentInput != null && (<>
            <div className="question">
                <label htmlFor="question">Вопрос: </label>
                <input
                    id="question"
                    type="text"
                    value={currentInput.question || ''}
                    onChange={handleQuestionChange}
                />
            </div>
            <div className="var">
                <label>Тип: </label>
                <select value={currentInput.type} onChange={handleTypeChange}>
                    <option value="add_missing">add_missing</option>
                    <option value="check_grammar">check_grammar</option>
                    <option value="check_answer">check_answer</option>
                </select>
            </div>
            <div className="question">
                <label htmlFor="answer">Ответ: </label>
                <input
                    id="answer"
                    type="text"
                    value={currentInput.answer}
                    onChange={handleAnswerionChange}
                />
            </div>
            <div className="var">
                <label htmlFor="record">Is Record: </label>
                <input 
                    id = "record"
                    type="checkbox"
                    checked={currentInput.isrecord}
                    onChange={handleToggle}/>
            </div>
            </>)}
        </>
    );
}


export default TextQuestion;