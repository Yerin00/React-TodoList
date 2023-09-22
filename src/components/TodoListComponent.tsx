// src/components/TodoList.tsx

import React, { useState, useEffect } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      const parsedTodos: Todo[] = JSON.parse(storedTodos);
      return parsedTodos;
    }
    return [];
  });
  const [newTodo, setNewTodo] = useState<string>('');


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    
  }, [todos]);
  console.log("every renderingtodos:",todos)
  const addTodo = () => {
    if (newTodo) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

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
    <div className={(screenWidth > 675?'w-1/2':'')+' p-8 bg-white rounded-xl '}>
      {/* title */}
      <h2 className='font-bold text-2xl'>TODO LIST</h2>
      {/* To Do contents input */}
      <div>
        <input
          className="border-b border-gray-300 p-2 focus:outline-none"
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        {/* Add To Do */}
        <button onClick={addTodo} type="button" className="ml-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">ADD</button>
        
      </div>
      
      {/* To Do List */}
      <ul className='mt-4'>  
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              className='mr-2'
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={ (todo.completed ? 'line-through' : 'none') + " mr-2" }>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
