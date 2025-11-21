import { useNavigate } from "react-router-dom"
import { DoneIcon, KeyIcon, LockIcon } from "../assets/icons"
import type { Board } from "../utils/types"

interface BoardComponentProps {
    board: Board
}

export const BoardComponent = ({board}: BoardComponentProps) => {
    const navigate = useNavigate()

    return (
        <div className="board flex-column" onClick={() => navigate(`/board/${board.id}`)}>
            <img 
                src={board.backgroundImage ? `http://localhost:5000${board.backgroundImage}` : undefined} alt=""
                className="backgroundImage" 
            />
            <div className="textInfoBox flex-between g8">
                <span className="boardName">{board.name}</span>
                {board.isPrivate ? <LockIcon /> : <KeyIcon />}
            </div>
        </div>
    )
}