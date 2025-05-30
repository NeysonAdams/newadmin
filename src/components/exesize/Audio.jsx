import React, { useRef, useState, useEffect } from "react";
import "./TestQuestion.css";

import { getFullURL } from "../../utils/api";

const Audio = ({ audio, updateAudio }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [currentAudio, setCurrentAudio] = useState(audio);

  useEffect(() => {
    setCurrentAudio(audio);
  }, [audio]);

  // Воспроизведение/Пауза
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Обновление времени
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Форматирование времени
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Обработчик завершения трека
  const handleEnded = () => {
    setIsPlaying(false);
  };

  // Установка продолжительности
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Обработчик изменения вопроса
  const handleQuestionChange = (event) => {
    const updatedAudio = { ...currentAudio, question: event.target.value };
    setCurrentAudio(updatedAudio);
    updateAudio(updatedAudio);
  };

  // Обработчик изменения текста аудио
  const handleAudioQueryChange = (event) => {
    const updatedAudio = { ...currentAudio, audio_query: event.target.value };
    setCurrentAudio(updatedAudio);
    updateAudio(updatedAudio);
  };

  // Обработчик изменения флага записи
  const handleToggle = (event) => {
    const updatedAudio = { ...currentAudio, isrecord: event.target.checked };
    setCurrentAudio(updatedAudio);
    updateAudio(updatedAudio);
  };

  return (
    <>
      
      <div className="question">
        <label htmlFor="question">Вопрос: </label>
        <input
          id="question"
          type="text"
          value={currentAudio.question}
          onChange={handleQuestionChange}
        />
      </div>

      <div className="var">
        <label htmlFor="audio_query">Аудио Текст: </label>
        <input
          id="audio_query"
          type="text"
          value={currentAudio.audio_query}
          onChange={handleAudioQueryChange}
        />
      </div>
      <audio
        ref={audioRef}
        src={getFullURL(currentAudio.audio_url)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        controls
      />

      <div className="var">
        <label htmlFor="record">Is Record: </label>
        <input
          id="record"
          type="checkbox"
          checked={currentAudio.isrecord}
          onChange={handleToggle}
        />
      </div>
    </>
  );
};

export default Audio;
