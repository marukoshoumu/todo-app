import React, { useState } from 'react';
import TodoForm from './TodoForm';

import { StatusType, TodoItemType } from './types';
import TodoList from './TodoList';

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusType | ''>('');

  const addTodo = (title: string, detail: string, deadline: string) => {
    const newTodo: TodoItemType = {
      id: todos.length + 1,
      title,
      status: 'notStarted',
      detail,
      deadline,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: number, updatedTitle: string, updatedDetail: string, updatedStatus: StatusType, updateDeadline: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, title: updatedTitle, detail: updatedDetail, status: updatedStatus, updatedAt: new Date(), deadline: updateDeadline }
          : todo
      )
    );
  };

  const filteredTodos = statusFilter
    ? todos.filter(todo => todo.status === statusFilter)
    : todos;

  return (
    <div>
      <h1>TODOリスト</h1>
      <TodoForm addTodo={addTodo} />

      <div>
        <label>ステータスで絞り込み: </label>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as StatusType | '')}
        >
          <option value="">全てのステータス</option>
          <option value="notStarted">未着手</option>
          <option value="inProgress">進行中</option>
          <option value="done">完了</option>
        </select>
      </div>

      <TodoList todos={filteredTodos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    </div>
  );
};

export default App;
