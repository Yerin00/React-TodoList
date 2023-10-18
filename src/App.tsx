// src/App.tsx

import React, { useState, useEffect } from 'react';
import './App.css';
import Weather from './components/WeatherComponent';
import TodoList from './components/TodoListComponent';
import useResizeScreen from './hooks/useResizeScreen';

function App() {
  
  const screenWidth = useResizeScreen()
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // 1분마다 현재 시간을 업데이트
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // 컴포넌트가 언마운트될 때 clearInterval을 호출하여 타이머를 정리
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // 현재 시간을 예쁘게 표시하기 위한 함수
  const formatTime = (date:Date) => {
    const year = date.getFullYear().toString()
    const month = date.getMonth().toString()
    const day = date.getDate().toString()
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  };

  return (
    <div className="App">
      <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
        
        <h1 className="font-bold text-white text-3xl">TODOLIST and Weather!</h1>
        <p className='text-white/70'>You Can manage your To Do List. </p>
        
      </header>
      <main className={(screenWidth>750?'flex flex-row gap-4':'flex flex-col gap-4')+' h-full bg-gray-200 p-4'}>
        <TodoList />
        <Weather />
      </main>
    </div>
  );
}

export default App;
