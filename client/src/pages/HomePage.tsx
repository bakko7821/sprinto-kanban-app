import { useEffect, useState } from "react"
import type { Board } from "../utils/types"
import axios from "axios"
import { BoardComponent } from "../components/BoardComponent"
import '../styles/homePage.scss'
import { AddIcon } from "../assets/icons"

export const HomePage = () => {
    const [boardsList, setBoardsList] = useState<Board[]>([])
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        async function fetchBoards() {
            if (!token || !userId) return

            try {
                const response = axios.get(`http://localhost:5000/api/users/all-boards/${Number(userId)}`,
                { headers: { Authorization: `Bearer ${token}` } })

                setBoardsList((await response).data)

            } catch (error: unknown) {
                console.log("Не удалось отправить запрос на получение списка всех досок")
            }
        }

        fetchBoards()
    }, [])

    return (
        <div className="homePage flex-column">
            <span className="boardListTitle">Рабочее пространство</span>
            <div className="boardList flex g16">
                {boardsList.map((board) => (
                    <BoardComponent 
                        board={board}
                        key={board.id}/>
                ))}
                <div className="board flex-column flex-center create">
                    <AddIcon />
                    <span>Создать доску</span>
                </div>
            </div>
        </div>
    )
}