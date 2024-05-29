import React, { useState } from 'react';
import './App.css';

interface Task {
    id: number;
    text: string;
    date: string;
    completed: boolean;
    color: number; 
}

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [filter, setFilter] = useState<string>('all');
    const [baseColor, setBaseColor] = useState<number>(135);

    const addTask = () => {
        if (inputValue.trim() !== '') {
            const newTask: Task = {
                id: Date.now(),
                text: inputValue,
                date: new Date().toLocaleDateString(),
                completed: false,
                color: baseColor 
            };
            setTasks([...tasks, newTask]);
            setInputValue('');
            let nextColor = baseColor + 30;
            if (nextColor >= 255) nextColor = 135;
            setBaseColor(nextColor);
        }
    };

    const removeTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleComplete = (id: number) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const clearAllTasks = () => {
        setTasks([]);
        setBaseColor(135); 
    };

    const filteredTasks = () => {
        switch (filter) {
            case 'completed':
                return tasks.filter(task => task.completed);
            case 'uncompleted':
                return tasks.filter(task => !task.completed);
            default:
                return tasks;
        }
    };

    return (
        <div className="wrapper">
            <h1 className="label">Список дел</h1>
            <div className="control">
                <input
                    className="newElementInput"
                    type="text"
                    placeholder="Новый элемент списка"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
                <button className="create" onClick={addTask}>Создать</button>
                <button className="clear" onClick={clearAllTasks}>Очистить всё</button>
            </div>

            <div className="list">
                {filteredTasks().map((task) => (
                    <div
                        key={task.id}
                        className={`element ${task.completed ? 'completed' : ''}`}
                        style={{ backgroundColor: `rgb(${task.color}, ${task.color}, ${task.color})` }} 
                    >
                        <div className="complete" onClick={() => toggleComplete(task.id)}>✔</div>
                        <div className="content">
                            <div className="text">{task.text}</div>
                            <div className="date">от {task.date}</div>
                        </div>
                        <div className="remove" onClick={() => removeTask(task.id)}>×</div>
                    </div>
                ))}
            </div>

            <div className="statistics">
                <hr className="statistics-hr" />
                <ul className="info">
                    <li>
                        <button className={`completedtasks ${filter === 'completed' ? 'bold' : ''}`} onClick={() => setFilter('completed')}>
                            Сделано({tasks.filter(task => task.completed).length})
                        </button>
                    </li>
                    <li>
                        <button className={`uncompletedtasks ${filter === 'uncompleted' ? 'bold' : ''}`} onClick={() => setFilter('uncompleted')}>
                            Не сделано({tasks.filter(task => !task.completed).length})
                        </button>
                    </li>
                    <li>
                        <button className={`alltask ${filter === 'all' ? 'bold' : ''}`} onClick={() => setFilter('all')}>
                            Все({tasks.length})
                        </button>
                    </li>
                </ul>
            </div>

            <footer className="footer">
                <hr />
                <p>Copyright ©</p>
            </footer>
        </div>
    );
}

export default App;
