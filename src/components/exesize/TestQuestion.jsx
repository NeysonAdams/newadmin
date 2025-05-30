import React, { useState } from "react";
import "./TestQuestion.css";

const TestQuestion = ({ question, updateQuestion }) => {
    const [currentQuestion, setCurrentQuestion] = useState({ ...question });

    const handleQuestionChange = (event) => {
        const updatedQuestion = { ...currentQuestion, question: event.target.value };
        setCurrentQuestion(updatedQuestion);
        updateQuestion(updatedQuestion);
    };

    const handleToggle = (event) => {
        const updatedQuestion = { ...currentQuestion, right_var: parseInt(event.target.id) };
        setCurrentQuestion(updatedQuestion);
        updateQuestion(updatedQuestion);
    };

    const handlerVariantChange = (event) => {
        const id = event.target.id; // "v1", "v2", etc.
        const index = parseInt(id[1]) - 1; // Convert "v1" -> 0
        const updatedAnswers = [...currentQuestion.test_answers];
        updatedAnswers[index] = event.target.value;

        const updatedQuestion = { ...currentQuestion, test_answers: updatedAnswers };
        setCurrentQuestion(updatedQuestion);
        updateQuestion(updatedQuestion);
    };

    return (
        <>
            <div className="question">
                <label htmlFor="question">Вопрос: </label>
                <input
                    id="question"
                    type="text"
                    value={currentQuestion.question}
                    onChange={handleQuestionChange}
                />
            </div>

            {[1, 2, 3, 4].map((num) => (
                <div className="var" key={num}>
                    <label htmlFor={`v${num}`}>В{num}: </label>
                    <input
                        id={`v${num}`}
                        type="text"
                        value={currentQuestion.test_answers[num - 1]}
                        onChange={handlerVariantChange}
                    />
                    <input
                        id={`${num}`}
                        type="checkbox"
                        checked={currentQuestion.right_var === num}
                        onChange={handleToggle}
                    />
                </div>
            ))}
        </>
    );
};

export default TestQuestion;
