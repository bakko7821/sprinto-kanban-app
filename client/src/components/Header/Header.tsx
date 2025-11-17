import { useNavigate } from "react-router-dom"
import { BellIcon, KanbanIcon, HelpIcon, UserFilledIcon } from "../../assets/icons"
import "./Header.scss"
import { SearchInput } from "./SearchInput"
import { useEffect, useState } from "react"
import { DropDownMenuUser } from "./DropDownMenuUser"
import type { User } from "../../utils/types"
import axios from "axios"

export const Header = () => {
    const navigate = useNavigate();
    const [dropDownMenuUserStatus, setDropDownMenuUserStatus] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    const token = localStorage.getItem("token")
    const userId: string | null = localStorage.getItem("userId")

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await axios.get(`http://localhost:5000/api/users/${Number(userId)}`,{
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUser(res.data);
            } catch (err) {
                console.error("Ошибка при загрузке пользователя:", err);
            }
        }

        fetchUser();
    }, [userId, token]);

    const handleCloseMenu = () => {
        setDropDownMenuUserStatus(false);
    };

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
                <div className="userAvatar" onClick={() => setDropDownMenuUserStatus((prev) => !prev)}>
                    <div className="glow"></div>
                    <div className="avatar flex-center">
                        <UserFilledIcon />
                    </div>
                </div>
            </div>

            {dropDownMenuUserStatus && <DropDownMenuUser onClose={handleCloseMenu} user={user} />}
        </header>
    )
}