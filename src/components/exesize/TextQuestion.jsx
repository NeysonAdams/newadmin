import React, { useState } from "react";
import "./TestQuestion.css";

const TextQuestion = ({ inputquestion, updateInput }) => {
    const [currentInput, setCurrentInput] = useState({ ...inputquestion });

    const handleQuestionChange = (event) => {
        const updatedInput = { ...currentInput, question: event.target.value };
        setCurrentInput(updatedInput);
        updateInput(updatedInput);
    };

    const handleAnswerionChange = (event) => {
        const updatedInput = { ...currentInput, answer: event.target.value };
        setCurrentInput(updatedInput);
        updateInput(updatedInput);
    };

    const handleTypeChange = (event) => {
        const updatedInput = { ...currentInput, type: event.target.value };
        setCurrentInput(updatedInput);
        updateInput(updatedInput);
    };

    const handleToggle = (event) => {
        const updatedInput = { ...currentInput, isrecord: event.target.checked };
        setCurrentInput(updatedInput);
        updateInput(updatedInput);
    };

    return (
        <>
            {currentInput != null && (
                <>
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
                        <select value={currentInput.type || ''} onChange={handleTypeChange}>
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
                            value={currentInput.answer || ''}
                            onChange={handleAnswerionChange}
                        />
                    </div>
                    <div className="var">
                        <label htmlFor="record">Is Record: </label>
                        <input
                            id="record"
                            type="checkbox"
                            checked={!!currentInput.isrecord}
                            onChange={handleToggle}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default TextQuestion;
