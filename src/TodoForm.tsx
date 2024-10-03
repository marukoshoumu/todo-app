import React, { useState } from 'react';

interface TodoFormProps {
    addTodo: (title: string, detail: string, deadline: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
    const [title, setTitle] = useState<string>('');
    const [detail, setDetail] = useState<string>('');
    const [deadline, setDeadline] = useState<string>('');

    const handleAddTodo = () => {
        if (title.trim()) {
            addTodo(title, detail, deadline);
            setTitle('');
            setDetail('');
            setDeadline('');
        }
    };

    return (
        <>
            <div className='form-area'>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="タイトルを入力"
                />
                <input
                    type="text"
                    value={detail}
                    onChange={e => setDetail(e.target.value)}
                    placeholder="詳細を入力"
                />
                <input
                    type="date"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                />
                <button onClick={handleAddTodo}>TODOを追加</button>
            </div>
        </>
    );
};

export default TodoForm;
