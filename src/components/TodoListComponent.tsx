// src/components/TodoList.tsx

import React, { useState, useEffect } from 'react';
import useResizeScreen from '../hooks/useResizeScreen';

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
  
  const addTodo = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault()
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


  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>(''); // 입력 값에 대한 별도의 상태

  const startEditingTodo = (id: string) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditedTodo(todoToEdit);
      setEditedTodoText(todoToEdit.text); // 입력 값을 todo 텍스트로 초기화
    }
  };

  const handleEditTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTodoText(e.target.value); // 입력 값 상태를 업데이트
  };

  const finishEditingTodo = () => {
    if (editedTodo) {
      const updatedTodo = { ...editedTodo, text: editedTodoText }; // todo 객체에서 텍스트 업데이트
      const updatedTodos = todos.map((todo) =>
        todo.id === editedTodo.id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
      setEditedTodo(null);
    }
  };



  const screenWidth = useResizeScreen()

  return (
    <div className={(screenWidth > 750?'w-1/2':'')+' p-8 bg-white rounded-xl '}>
      {/* title */}
      <h2 className='font-bold text-2xl'>TODO LIST</h2>
      {/* input */}
      <form onSubmit={addTodo}>
        <input
          className="border-b border-gray-300 p-2 focus:outline-none"
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        {/* Add Button */}
        <button type="submit" className={(screenWidth>380?"ml-2":"w-[197px] mt-4")+" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"}>ADD</button>
        
      </form>
      
      
      {/* ToDo List */}
      <ul className='mt-4'>  
        {todos.map((todo) => (
          <li key={todo.id}>
            {editedTodo === todo ? (
              <div>

                <input
                  className="border-b border-gray-300 focus:outline-none"
                  type="text"
                  value={editedTodoText}
                  onChange={handleEditTodo}
                  // onBlur={finishEditingTodo}
                  autoFocus
                />
                <button className="text-gray-400" onClick={finishEditingTodo}>저장</button>
              </div>
            ) : (
              <>
                <input
                  className="mr-2"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className={todo.completed ? 'line-through' : 'none'}>{todo.text}</span>
                <button className="ml-4 mr-2 text-gray-400" onClick={() => startEditingTodo(todo.id)}>수정</button>
                <button className="text-red-400" onClick={() => deleteTodo(todo.id)}>×</button>
              </>
            )}
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
