import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { Board } from "../utils/types"
import axios from "axios"
import "../styles/boardPage.scss"
import { DoneIcon, HammerIcon, HeartIcon, LayersIcon, MoreIcon, SortIcon, UsersIcon } from "../assets/icons"

export const BoardPage = () => {
    const {id} = useParams()
    const [board, setBoard] = useState<Board | null>(null)
    const [boardName, setBoardName] = useState("")
    const [editingName, setEditingName] = useState(false)

    const token = localStorage.getItem("token")
    const userId: string | null = localStorage.getItem("userId")

    useEffect(() => {
        async function fetchUser() {
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

        fetchUser();
    }, [id, token]);

    useEffect(() => {
        
    }, [board])
    
    const handleSaveChange = () => {
        console.log("saveChanges")
        setEditingName(false)
    }

    return (
        <div className="boardPage flex-column">
            <div className="headerBox flex-between">
                {!editingName ? (
                    <span className="nameText" onClick={() => {setEditingName((prev) => !prev)}}>{board?.name}</span>
                ) : (
                    <form className="changeNameForm flex-center g8">
                        <input 
                        type="text"
                        className="changeNameInput"
                        id="name"
                        value={boardName}
                        onChange={(e) => setBoardName(e.target.value)} />

                        <button className="saveChangeNameButton" onClick={handleSaveChange}><DoneIcon /></button>
                    </form>
                )}
                <nav className="flex-center g8">
                    <button className="upgradeButton"><LayersIcon /></button>
                    <button className="autoButton" id="hammerButton"><HammerIcon /></button>
                    <button className="sortButton"><SortIcon /></button>
                    <button className="favoriteButton"><HeartIcon /></button>
                    <button className="visibilityButton"><UsersIcon /></button>
                    <button className="shareButton">Поделиться</button>
                    <button className="moreButton"><MoreIcon /></button>
                </nav>
            </div>
        </div>
    )
}