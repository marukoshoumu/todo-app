import React, { useEffect, useState } from 'react';
import { TodoItemType, StatusType } from './types';

interface TodoItemProps {
    todo: TodoItemType;
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, updatedTitle: string, updatedDetail: string, updatedStatus: StatusType, updatedDeadline: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, deleteTodo, updateTodo }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedTitle, setEditedTitle] = useState<string>(todo.title);
    const [editedDetail, setEditedDetail] = useState<string>(todo.detail);
    const [editedStatus, setEditedStatus] = useState<StatusType>(todo.status);
    const [editedDeadline, setEditedDeadline] = useState<string>(todo.deadline || '');

    useEffect(() => {
        if (todo.status !== editedStatus) {
            updateTodo(todo.id, editedTitle, editedDetail, editedStatus, editedDeadline);
        }
    }, [editedStatus, todo.id, editedTitle, editedDetail, editedDeadline, todo.status, updateTodo]);

    const handleUpdate = () => {
        updateTodo(todo.id, editedTitle, editedDetail, editedStatus, editedDeadline);
        setIsEditing(false);
    };

    return (
        <li className={`todo-item ${todo.status}`}>
            {isEditing ? (
                <div className='list-row'>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={e => setEditedTitle(e.target.value)}
                        placeholder="タイトルを編集"
                    />
                    <input
                        type='text'
                        value={editedDetail}
                        onChange={e => setEditedDetail(e.target.value)}
                        placeholder="詳細を編集"
                    />
                    <input
                        type="date"
                        value={editedDeadline}
                        onChange={e => setEditedDeadline(e.target.value)}
                    />
                    <select
                        value={editedStatus}
                        onChange={e => setEditedStatus(e.target.value as StatusType)}
                    >
                        <option value="notStarted">未着手</option>
                        <option value="inProgress">進行中</option>
                        <option value="done">完了</option>
                    </select>
                    <button onClick={handleUpdate}>更新</button>
                    <button onClick={() => deleteTodo(todo.id)}>削除</button>
                </div>
            ) : (
                <div className='list-row'>
                    <p>{todo.title}</p>
                    <p>{todo.detail}</p>
                    <p>期限: {todo.deadline ? todo.deadline : '設定なし'}</p>
                    <select
                        value={editedStatus}
                        onChange={e => setEditedStatus(e.target.value as StatusType)}
                    >
                        <option value="notStarted">未着手</option>
                        <option value="inProgress">進行中</option>
                        <option value="done">完了</option>
                    </select>
                    <button onClick={() => setIsEditing(true)}>編集</button>
                    <button onClick={() => deleteTodo(todo.id)}>削除</button>
                </div>
            )}
        </li>
    );
};

export default TodoItem;
