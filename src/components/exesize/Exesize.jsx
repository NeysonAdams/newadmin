import React from "react";
import "./Exesize.css"
import { useState } from "react";
import TestQuestion from "./TestQuestion";
import Audio from "./Audio";
import TextQuestion from "./TextQuestion";
import WordsPair from "./WordsPair";

import { generateExesize } from "../../utils/api";

const Exesize = ({exesize, language, updateExesize, removeElement, handleSawe, id})=>
{

    const [currentExesize, setCurrentExesize] = useState(exesize); 
    const [difficulty, seDifficulty]= useState("Beginner")
    const handleTypeChange = (event) =>
    {
        exesize.type = event.target.value;
        let newExesize = {}
        if (exesize.type === "test_question" && exesize.id ===  -1){
            newExesize = {
                id : -1,
                type: "test_question",
                question : {
                    id: -1,
                    question:"",
                    test_answers:["","","",""],
                    right_var:0,
                }
            }
        }
        
        else if (exesize.type === "audio_question" && exesize.id ===  -1){
            newExesize = {
                id : -1,
                type: "audio_question",
                audio : {
                    id: -1,
                    question:"",
                    audio_query:"",
                    audio_url: "",
                    isrecord: false
                }
            }
        }

        else if (exesize.type === "input_question" && exesize.id ===  -1){
            newExesize = {
                id : -1,
                type: "input_question",
                inputquestion : {
                    id: -1,
                    question:"",
                    type:"add_missing",
                    answer:"",
                    isrecord: false
                }
            }
        }

        else if (exesize.type === "word_pair_exesize" && exesize.id === -1){
            newExesize = {
                id : -1,
                type: "word_pair_exesize",
                word_ex : 
                {
                    id: -1,
                    words:[]
                }
            }
        }
        else{
            newExesize = exesize;
        }
        console.log(newExesize);
        setCurrentExesize(newExesize);
        updateExesize(newExesize, id);
    }

    const handleDifChange = (event) =>
    {
        seDifficulty(event.target.value);
    }

    const handleGenerate = (event) =>
    {
        let itype =""
        if (currentExesize.type == "input_question")
        {
            console.log(exesize);
            itype = currentExesize.inputquestion.type;
        }
        console.log(currentExesize.type)
        setCurrentExesize(null);
        generateExesize({difficulty: difficulty, type:currentExesize.type, language: language, itype:itype})
        .then((data) => {
            console.log(data);
            if (exesize.type == "test_question")
            {
                exesize.question = {
                    id: -1,
                    question: data.question,
                    test_answers: [
                        data.var1,
                        data.var2,
                        data.var3,
                        data.var4
                    ],
                    right_var: data.right
                }
            }

            if (exesize.type == "audio_question")
            {
                exesize.audio = {
                    id: -1,
                    question: data.question,
                    audio_query: data.audio_query,
                    audio_url:data.audio_url,
                    isrecord: false
                }
            }

            if (exesize.type == "input_question")
            {
                exesize.inputquestion = {
                    id: -1,
                    question: data.question,
                    answer: data.answer,
                    type:currentExesize.inputquestion.type,
                    isrecord: false
                }
            }

            if (exesize.type == "word_pair_exesize")
                {
                    for (let i = 0; i < data.words.length; i++) {
                        data.words[i].id = -1; 
                    }
                    exesize.word_ex = {
                        id: -1,
                        words: data.words
                    }


                }
            setCurrentExesize(exesize);
            updateExesize(exesize, id);
            
          })
          .catch((err) => {
            console.error(err);
          });
    }


    const updateQuestion = (question)=>
    {
        exesize.question = question;
        setCurrentExesize(exesize);
        updateExesize(exesize, id);
    }

    const updateAudio = (audio) =>
    {
        exesize.audio = audio;
        setCurrentExesize(exesize);
        updateExesize(exesize, id);
    }

    const updateWordsEx = (words) =>
    {
        exesize.word_ex = words;
        setCurrentExesize(exesize);
        updateExesize(exesize, id);
    }

    const updateInput = (inputQuestion) =>
        {
            exesize.inputquestion = inputQuestion;
            setCurrentExesize(exesize);
            updateExesize(exesize, id);
        }
    

    const handleDelete = (event) =>
    {
        if (exesize.id != -1){
            removeElement({object: event.target.id, object_id: exesize.id}, ()=>
            {
                setCurrentExesize(null);
                updateExesize(null, id);
            });
        }
    }

    return (
        <div className="exesize">
            <div className="exesize-header">
            {currentExesize != null && (
                <div className="exesize-type-selector">
                            <label>Тип: </label>
                            <select value={currentExesize.type} onChange={handleTypeChange}>
                                <option value="test_question">Тесты</option>
                                <option value="input_question">Тесктовый вопрос</option>
                                <option value="audio_question">Аудио</option>
                                <option value="word_pair_exesize">Слова Пары</option>
                            </select>
                </div>)}
                <div className="exesize-type-selector">
                            <label>Сложность: </label>
                            <select value={difficulty} onChange={handleDifChange}>
                                <option value="Beginner">Beginner</option>
                                <option value="Elementary">Elementary</option>
                                <option value="Pre-Intermediate">Pre-Intermediate</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                </div>
                <div className="buttons-container">
                    <button className="generate-button" onClick={handleGenerate}>
                        Сгенерировать
                    </button>
                    <button className="sawe-button" onClick={handleSawe}>
                        Сохранить
                    </button>
                    <button id="exesize" className="delete-button" onClick={handleDelete}>
                        Удалить
                    </button>
                </div>
            </div>
            {currentExesize != null && (
                <>
                    {currentExesize.type == "test_question" && currentExesize.question != null && (
                        <TestQuestion question={currentExesize.question} updateQuestion={updateQuestion}/>
                    )}
                    {currentExesize.type == "audio_question" && currentExesize.audio != null && (
                        <Audio audio={currentExesize.audio} updateAudio={updateAudio}/>
                    )}
                    {currentExesize.type == "input_question" && currentExesize.inputquestion != null && (
                        <TextQuestion inputquestion={currentExesize.inputquestion} updateInput={updateInput}/>
                    )}
                    {currentExesize.type == "word_pair_exesize" && currentExesize.word_ex != null && (
                        <WordsPair words={currentExesize.word_ex} language={language} update={updateWordsEx}/>
                    )}
                </>
            )}
        </div>
        
    )
}

export default Exesize;