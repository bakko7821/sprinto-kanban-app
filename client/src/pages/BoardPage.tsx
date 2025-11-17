import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { Board, Column } from "../utils/types"
import axios from "axios"
import "../styles/boardPage.scss"
import { AddIcon, CrossIcon, DoneIcon, EditIcon, HammerIcon, HeartIcon, MoreIcon, SortIcon, UsersIcon } from "../assets/icons"
import { ColumnComponent } from "../components/BoardPage/ColumnComponent"

export const BoardPage = () => {
    const {id} = useParams()
    const [board, setBoard] = useState<Board | null>(null)
    const [columns, setColumns] = useState<Column[]>([])
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

        async function fetchColumns() {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/columns/boardId/${board?.id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setColumns(res.data);
            } catch (err) {
                console.error("Ошибка при загрузке колонок:", err);
            }
        }

        fetchColumns();
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
                    <button className="autoButton" id="hammerButton"><HammerIcon /></button>
                    <button className="sortButton"><SortIcon /></button>
                    <button className="favoriteButton"><HeartIcon /></button>
                    <button className="visibilityButton"><UsersIcon /></button>
                    <button className="shareButton">Поделиться</button>
                    <button className="moreButton"><MoreIcon /></button>
                </nav>
            </div>
            <div className="columnsBox flex g16">
                {columns.map((column) => {
                    return <ColumnComponent column={column} key={column.id} />;
                })}
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
        </div>
    )
}