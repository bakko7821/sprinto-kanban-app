import { useEffect, useState } from "react";
import { AddIcon, CrossIcon, MoreIcon } from "../../assets/icons";
import type { Task, Column } from "../../utils/types";
import axios from "axios";
import { TaskComponent } from "./TaskComponent";

interface ColumnComponentProps {
    column: Column;
}

export const ColumnComponent = ({ column }: ColumnComponentProps) => {
    const [isAdding, setIsAdding] = useState(false)
    const [taskName, setTaskName] = useState("")
    const [tasks, setTasks] = useState<Task[]>([])

    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")

    const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!token || !userId || !column?.id) return;

        try {
            await axios.post(
                `http://localhost:5000/api/tasks/${column.id}`,
                { name: taskName },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setTaskName("");
            setIsAdding(false);

            const res = await axios.get(
                `http://localhost:5000/api/tasks/columnId/${column.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setTasks(res.data);

        } catch (err) {
            console.error("Ошибка при создании задачи:", err);
        }
    }

    useEffect(() => {
        async function fetchTasks() {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/tasks/columnId/${column.id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                setTasks(res.data);
            } catch (err) {
                console.error("Ошибка при создании задачи:", err);
            }
        }

        fetchTasks()
    }, [])

    const handleDoneTask = () => {
        console.log('Выбрана задача')
    }

    const updateTask = async (id: number, updated: Partial<Task>) => {
        await axios.put(`http://localhost:5000/api/tasks/${id}`, updated, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setTasks(prev =>
            prev.map(t => t.id === id ? { ...t, ...updated } : t)
        );
    };

    return (
        <div className="column flex-column g12">
            <div className="columnHeader flex-between">
                <span className="columnName">{column.name}</span>
                <button className="moreButton"><MoreIcon /></button>
            </div>
            <div className="taskList flex-column g8">
                {tasks.map((task) => {
                    return <TaskComponent task={task} onDone={handleDoneTask} key={task.id} onUpdate={updateTask}/>
                })}
            </div>
            {!isAdding ? (
                <button className="addTaskButton flex-center g8" onClick={() => {setIsAdding((prev) => !prev)}}>
                    <AddIcon />
                    Добавить задачу
                </button>
            ) : (
                <form className="addTaskForm flex-column g8" onSubmit={handleCreateTask}>
                    <input 
                        type="text" 
                        className="changeNameInput"
                        id="name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder="Введите имя задачи..." />
                    <div className="buttonsBox flex-center g8">
                        <button className="createTaskButton" onClick={() => handleCreateTask}>Добавить задачу</button>
                        <button className="closeFormButton flex-center" onClick={() => {setIsAdding((prev) => !prev)}}><CrossIcon /></button>
                    </div>
                </form>
            )}
        </div>
    )
}