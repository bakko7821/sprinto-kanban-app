import { useNavigate } from "react-router-dom"
import { BellIcon, KanbanIcon, HelpIcon, UserFilledIcon } from "../../assets/icons"
import "./Header.scss"
import { SearchInput } from "./SearchInput"

export const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="flex-between">
            <div className="logo flex-center g8" onClick={() => navigate("/")}>
                <KanbanIcon />
                <span>Sprinto</span>
            </div>
            <div className="searchBox flex-center g16">
                <SearchInput />
                <button className="createTaskButton">Создать</button>
            </div>
            <div className="userNavigate flex-center g8">
                <nav className="flex-center g4">
                    <button className="bellButton flex-center"><BellIcon /></button>
                    <button className="helpButton flex-center"><HelpIcon /></button>
                </nav>
                <div className="userAvatar">
                    <div className="glow"></div>
                    <div className="avatar flex-center">
                        <UserFilledIcon />
                    </div>
                </div>
            </div>
        </header>
    )
}