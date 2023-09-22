// src/App.tsx

import React, { useState, useEffect } from 'react';
import './App.css';
import Weather from './components/WeatherComponent';
import TodoList from './components/TodoListComponent';

function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // 화면 크기가 변경될 때마다 실행되는 함수
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // 화면 크기 변경 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div className="App">
      <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
        <h1 className="font-bold text-white text-3xl">Welcome!</h1>
        <p className='text-gray-300'>You Can manage your To Do List. </p>
      </header>
      <main className={(screenWidth>675?'flex gap-4':'')+' h-full bg-gray-200 p-4'}>
        <TodoList />
        <Weather />
      </main>
    </div>
  );
}

export default App;
