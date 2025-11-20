import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { Board, Column, Task } from "../utils/types"
import axios from "axios"
import "../styles/boardPage.scss"
import { AddIcon, ArchiveIcon, CrossIcon, DoneIcon, EditIcon, HammerIcon, HeartIcon, MoreIcon, SortIcon, UsersIcon } from "../assets/icons"
import { ColumnComponent } from "../components/BoardPage/ColumnComponent"
import { closestCenter, DndContext, DragOverlay, type DragEndEvent, } from "@dnd-kit/core"
import { TaskComponent } from "../components/BoardPage/TaskComponent"

export const BoardPage = () => {
    const {id} = useParams()
    const [board, setBoard] = useState<Board | null>(null)
    const [columns, setColumns] = useState<Column[]>([])
    const [tasksByColumn, setTasksByColumn] = useState<{ [columnId: string]: Task[] }>({});
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [boardName, setBoardName] = useState("")
    const [columnName, setColumnName] = useState("")
    const [editingName, setEditingName] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    

    const token = localStorage.getItem("token")
    const userId: string | null = localStorage.getItem("userId")

    

    useEffect(() => {
        if (!token || !userId) return;

        async function fetchBoard() {
            try {
                const res = await axios.get(`http://localhost:5000/api/boards/${Number(id)}`,{
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setBoard(res.data);
                setBoardName(res.data.name)
            } catch (err) {
                console.error("Ошибка при загрузке пользователя:", err);
            }
        }

        fetchBoard();
    }, [id, token]);

    useEffect(() => {
        if (!token || !userId || !board?.id) return;

        async function fetchColumnsAndTasks() {
            try {
                const resColumns = await axios.get(
                    `http://localhost:5000/api/columns/boardId/${board?.id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const columnsData = resColumns.data;
                setColumns(columnsData);

                const tasksByColumn: { [columnId: string]: Task[] } = {};

                await Promise.all(
                    columnsData.map(async (column: Column) => {
                        const resTasks = await axios.get(
                            `http://localhost:5000/api/tasks/columnId/${column.id}`,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        tasksByColumn[column.id] = resTasks.data;
                    })
                );

                setTasksByColumn(tasksByColumn);
            } catch (err) {
                console.error("Ошибка при загрузке колонок и задач:", err);
            }
        }

        fetchColumnsAndTasks();
    }, [board?.id, token, userId]);

    
    const handleSaveChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("saveChanges")
        setEditingName(false)
    }

    const handleCreateColumn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!token || !userId || !board?.id) return;

        try {
            await axios.post(
                `http://localhost:5000/api/columns/${board.id}`,
                { name: columnName },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setColumnName("");
            setIsAdding(false);

            const res = await axios.get(
                `http://localhost:5000/api/columns/boardId/${board.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setColumns(res.data);

        } catch (err) {
            console.error("Ошибка при создании колонки:", err);
        }
    };

    const handleDeleteColumn = (columnId: number) => {
        console.log("Удаляем колонку:", columnId);
        setColumns(prev => prev.filter(c => c.id !== columnId));
    };


    const handleDeleteTask = async (id: number) => {

        if (!token) return;

        try {
            setTasksByColumn(prev => {
                const next: { [columnId: string]: Task[] } = {};
                    Object.keys(prev).forEach(colId => {
                        next[colId] = (prev[colId] ?? []).filter(t => t.id !== id);
                    });
                return next;
            });

            await axios.delete(`http://localhost:5000/api/tasks/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (err) {
            console.error("Ошибка при удалении задачи:", err);
        }
    };

    const handleAddTask = (columnId: number, newTask: Task) => {
        setTasksByColumn(prev => ({
            ...prev,
            [columnId]: [...(prev[columnId] || []), newTask]
        }));
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        setActiveTask(null)
        const { active, over } = event;
        if (!over) return;

        const taskId = active.id as number;
        const newColumnId = Number(over.id);

        const fromColumnId = Number(
            Object.keys(tasksByColumn).find(columnId =>
                tasksByColumn[columnId].some(task => task.id === taskId)
            )
        );

        if (!fromColumnId || fromColumnId === newColumnId) return;

        const movingTask = tasksByColumn[fromColumnId].find(task => task.id === taskId);
        if (!movingTask) return;

        setTasksByColumn(prev => ({
            ...prev,
            [fromColumnId]: prev[fromColumnId].filter(task => task.id !== taskId),
            [newColumnId]: [...(prev[newColumnId] || []), { ...movingTask, columnId: newColumnId }],
        }));

        try {
            await axios.put(`http://localhost:5000/api/tasks/${taskId}/update-position`,
                { columnId: newColumnId },
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
            )
        } catch (err) {
            console.error("Ошибка при обновлении задачи на сервере:", err);
        }
    };


    return (
        <div className="boardPage flex-column">
            <div className="headerBox flex-between">
                {!editingName ? (
                    <span className="nameText" onClick={() => {setEditingName((prev) => !prev)}}>{board?.name}</span>
                ) : (
                    <form className="changeNameForm flex-center g8" onSubmit={handleSaveChange}>
                        <input 
                        type="text"
                        className="changeNameInput"
                        id="name"
                        value={boardName}
                        onChange={(e) => setBoardName(e.target.value)} />

                        <button className="saveChangeNameButton" onClick={() => handleSaveChange}><DoneIcon /></button>
                    </form>
                )}
                <nav className="flex-center g8">
                    <button className="upgradeButton"><EditIcon /></button>
                    <button className="archiveButton"><ArchiveIcon /></button>
                    <button className="autoButton" id="hammerButton"><HammerIcon /></button>
                    <button className="sortButton"><SortIcon /></button>
                    <button className="favoriteButton"><HeartIcon /></button>
                    <button className="visibilityButton"><UsersIcon /></button>
                    <button className="shareButton">Поделиться</button>
                    <button className="moreButton"><MoreIcon /></button>
                </nav>
            </div>
            <DndContext
                collisionDetection={closestCenter}
                onDragStart={(event) => {
                    const id = event.active.id;

                    const allTasks = Object.values(tasksByColumn).flat();
                    const task = allTasks.find(t => t.id === id);

                    setActiveTask(task || null);
                }}
                onDragEnd={(event) => {
                    handleDragEnd(event);
                    setActiveTask(null);
                }}
            >
                <div className="columnsBox flex g16">
                    {columns.map((column) => (
                    <ColumnComponent
                        key={column.id}
                        column={column}
                        tasks={tasksByColumn[column.id] || []}
                        onTasksChange={(newTasks) =>
                            setTasksByColumn(prev => ({ ...prev, [column.id]: newTasks }))
                        }
                        onAddTask={handleAddTask}
                        onDeleteTask={handleDeleteTask}
                        onDeleteColumn={handleDeleteColumn}  // ← ДОБАВИТЬ
                    />

                    ))}

                    {!isAdding ? (
                        <button className="addColumnButton flex-center g8" onClick={() => {setIsAdding((prev) => !prev)}}>
                            <AddIcon />
                            Добавить колонку
                        </button>
                    ) : (
                        <form className="addColumnForm flex-column g8" onSubmit={handleCreateColumn}>
                            <input 
                                type="text" 
                                className="changeNameInput"
                                id="name"
                                value={columnName}
                                onChange={(e) => setColumnName(e.target.value)}
                                placeholder="Введите имя колонки..." />
                            <div className="buttonsBox flex-center g8">
                                <button className="createColumnButton" onClick={() => handleCreateColumn}>Создать колонку</button>
                                <button className="closeFormButton flex-center" onClick={() => {setIsAdding((prev) => !prev)}}><CrossIcon /></button>
                            </div>
                        </form>
                    )}
                </div>
                <DragOverlay>
                    {activeTask ? (
                        <TaskComponent
                            task={activeTask}
                            onDone={() => {}}
                            onUpdate={() => {}}
                            onDeleteTask={handleDeleteTask}
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    )
}