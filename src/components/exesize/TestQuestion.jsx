import React from "react";
import "./TestQuestion.css"
import { useState } from "react";

const TestQuestion = ({question, updateQuestion}) =>
{
    const [currentQuestion, setCurrentQuestion] = useState(question)
    
    const handleQuestionChange = (event) =>
    {
            question.question = event.target.value;
            setCurrentQuestion(question);
            updateQuestion(question);
    }
    
    const handleToggle = (event) => {
        question.right_var = event.target.id;
        setCurrentQuestion(question);
        updateQuestion(question);
    }
    
    const handlerVariantChange = (event) => {
        const vId = event.target.id;
        if(id==="v1")
            question.test_answers[0] = event.target.value;
        else if(id==="v2")
            question.test_answers[1] = event.target.value;
        else if(id==="v3")
            question.test_answers[1] = event.target.value;
        else if(id==="v4")
            question.test_answers[1] = event.target.value;

        setCurrentQuestion(question);
        updateQuestion(question);
    }

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
                    <div className="var">
                        <label htmlFor="v1">В1: </label>
                        <input
                            id="v1"
                            type="text"
                            value={currentQuestion.test_answers[0]}
                            onChange={handlerVariantChange}
                        />
                        <input 
                            id = "1"
                            type="checkbox"
                            checked={currentQuestion.right_var == 1}
                            onChange={handleToggle}/>
                    </div>
                    <div className="var">
                        <label htmlFor="v2">В2: </label>
                        <input
                            id="v2"
                            type="text"
                            value={currentQuestion.test_answers[1]}
                            onChange={handlerVariantChange}
                        />
                        <input 
                            id = "2"
                            type="checkbox"
                            checked={currentQuestion.right_var == 2}
                            onChange={handleToggle}/>
                    </div>
                    <div className="var">
                        <label htmlFor="v3">В3: </label>
                        <input
                            id="v3"
                            type="text"
                            value={currentQuestion.test_answers[2]}
                            onChange={handlerVariantChange}
                        />
                        <input 
                            id = "3"
                            type="checkbox"
                            checked={currentQuestion.right_var == 3}
                            onChange={handleToggle}/>
                    </div>
                    <div className="var">
                        <label htmlFor="v4">В4: </label>
                        <input
                            id="v4"
                            type="text"
                            value={currentQuestion.test_answers[3]}
                            onChange={handlerVariantChange}
                        />
                        <input 
                            id = "4"
                            type="checkbox"
                            checked={currentQuestion.right_var == 4}
                            onChange={handleToggle}/>
                    </div>
                </>
    )
}

export default TestQuestion;