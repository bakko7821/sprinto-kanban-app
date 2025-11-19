import { useEffect, useState } from "react";
import { AddIcon, CrossIcon, MoreIcon } from "../../assets/icons";
import type { Task, Column } from "../../utils/types";
import axios from "axios";
import { TaskComponent } from "./TaskComponent";
import { ColumnDropDownMenu } from "./DropDownMenus/ColumnDropDownMenu";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import './columnsComponent.scss'

interface ColumnComponentProps {
    column: Column;
    tasks: Task[]; // массив задач этой колонки
    onDelete: (id: number) => void; // удаление колонки
    onTasksChange: (newTasks: Task[]) => void; // обновление задач после drag-and-drop
}

export const ColumnComponent = ({ column, tasks, onDelete, onTasksChange }: ColumnComponentProps) => {
    const { setNodeRef: setDroppableRef } = useDroppable({ id: column.id });
    const [isAdding, setIsAdding] = useState(false)
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [taskName, setTaskName] = useState("")

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

        } catch (err) {
            console.error("Ошибка при создании задачи:", err);
        }
    }


    const handleDoneTask = () => {
        console.log('Выбрана задача')
    }

    const updateTask = async (id: number, updated: Partial<Task>) => {
        await axios.put(`http://localhost:5000/api/tasks/${id}`, updated, {
            headers: { Authorization: `Bearer ${token}` }
        });
    };

    const handleCloseMenu = () => {
        setIsOpenMenu(false)
    }

    const handleDeleteColumn = async () => {
        if (!token) return;

        try {
            
            onDelete(column.id);
            setIsOpenMenu(false);
            
            await axios.delete(
                `http://localhost:5000/api/columns/${column.id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

        } catch (err) {
            console.error("Ошибка при удалении колонки:", err);
        }
    };

    return (
        <div className="column flex-column g12">
            <div className="columnHeader flex-between">
                <span className="columnName">{column.name}</span>
                <button className="moreButton" onClick={() => {setIsOpenMenu((prev) => !prev)}}><MoreIcon /></button>
            </div>
            <div ref={setDroppableRef} className="taskList flex-column g8">
                {tasks.map((task) => {
                    return (
                        <TaskComponent
                            key={task.id}
                            task={task}
                            onDone={handleDoneTask}
                            onUpdate={updateTask}
                        />
                    );
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

            {!isOpenMenu ? null : (
                <ColumnDropDownMenu onClose={handleCloseMenu} onDelete={handleDeleteColumn}/>
            )}
        </div>
    )
}