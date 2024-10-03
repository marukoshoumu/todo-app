import React from 'react';
import TodoItem from './TodoItem';
import { StatusType, TodoItemType } from './types';

interface TodoListProps {
    todos: TodoItemType[];
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, updatedTitle: string, updatedDetail: string, updatedStatus: StatusType, updatedDeadline: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo, updateTodo }) => {
    return (
        <>
            <div className="todo-area">
                <ul>
                    {todos.map(todo => (
                        <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default TodoList;
