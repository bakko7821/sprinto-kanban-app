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
    tasks: Task[];
    onTasksChange: (tasks: Task[]) => void;
    onAddTask: (columnId: number, task: Task) => void;
    onDeleteTask: (id: number) => void;
    onDeleteColumn: (id: number) => void;
    fetchColumnsAndTasks: () => void;
}


export const ColumnComponent = ({fetchColumnsAndTasks, column, tasks, onAddTask, onDeleteColumn, onDeleteTask, onTasksChange }: ColumnComponentProps) => {
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
            const res = await axios.post(
                `http://localhost:5000/api/tasks/${column.id}`,
                { name: taskName },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const newTask: Task = res.data;

            onAddTask(column.id, newTask);

            setTaskName("");
            setIsAdding(false);

        } catch (err) {
            console.error("Ошибка при создании задачи:", err);
        }
    };

    const handleDoneTask = () => {
        console.log('Выбрана задача')
    }

    const updateTask = async (id: number, updated: Partial<Task>) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/tasks/${id}`,
                updated,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const updatedTask = response.data;

            const newTaskList = tasks
                .map(t => (t.id === id ? updatedTask : t)) // заменяем задачу
                .filter(t => !t.isArchive); // убираем архивные задачи

            onTasksChange(newTaskList);

        } catch (err) {
            console.error("Ошибка при обновлении задачи", err);
        }
    };


    const handleCloseMenu = () => {
        setIsOpenMenu(false)
    }

    const handleDeleteColumn = async () => {
        if (!token) return;

        try {
            
            onDeleteColumn(column.id);
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
                            onDeleteTask={onDeleteTask}
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
                <ColumnDropDownMenu fetchColumnsAndTasks={fetchColumnsAndTasks} column={column} onClose={handleCloseMenu} onDelete={handleDeleteColumn}/>
            )}
        </div>
    )
}