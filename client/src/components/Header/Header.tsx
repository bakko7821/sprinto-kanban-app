import { useNavigate } from "react-router-dom"
import { BellIcon, KanbanIcon, HelpIcon, UserFilledIcon } from "../../assets/icons"
import "./Header.scss"
import { SearchInput } from "./SearchInput"
import { useEffect, useState } from "react"
import { DropDownMenuUser } from "./DropDownMenus/DropDownMenuUser"
import type { User } from "../../utils/types"
import axios from "axios"
import { DropDownMenuNotification } from "./DropDownMenus/DropDownMenuNotification"
import { DropDownMenuHelp } from "./DropDownMenus/DropDownMenuHelp"
import { useLogout } from "../../hooks/LogoutContext"

export const Header = () => {
    const { isLoggedOut } = useLogout();
    const navigate = useNavigate();
    const [dropDownMenuUserStatus, setDropDownMenuUserStatus] = useState(false)
    const [dropDownMenuNotificationStatus, setDropDownMenuNotificationStatus] = useState(false)
    const [dropDownMenuHelpStatus, setDropDownMenuHelpStatus] = useState(false)
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
        setDropDownMenuNotificationStatus(false);
        setDropDownMenuHelpStatus(false);
    };

    const openMenu = (type: string) => {
        setDropDownMenuUserStatus(false)
        setDropDownMenuNotificationStatus(false)
        setDropDownMenuHelpStatus(false)

        if (type === "userMenu") {
            setDropDownMenuUserStatus(true)
        } else if (type === "notificationMenu") {
            setDropDownMenuNotificationStatus(true)
        } else {
            setDropDownMenuHelpStatus(true)
        }
    }

    return (
        <header className={`header flex-between ${isLoggedOut ? "logOut" : ""}`}>
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
                    <button className="bellButton flex-center" onClick={() => openMenu('notificationMenu')}><BellIcon /></button>
                    <button className="helpButton flex-center" onClick={() => openMenu('helpMenu')}><HelpIcon /></button>
                </nav>
                <div className="userAvatar" onClick={() => openMenu('userMenu')}>
                    <div className="glow"></div>
                    {user?.avatarImage ? (
                        <img src={`http://localhost:5000/uploads/${user.avatarImage}`} alt="" className="avatar" />
                    ) : (
                        <div className="avatar flex-center">
                            <UserFilledIcon />
                        </div>
                    )}
                </div>
            </div>

            {dropDownMenuUserStatus && <DropDownMenuUser onClose={handleCloseMenu} user={user} />}
            {dropDownMenuNotificationStatus && <DropDownMenuNotification onClose={handleCloseMenu} userId={user?.id} />}
            {dropDownMenuHelpStatus && <DropDownMenuHelp onClose={handleCloseMenu} />}
        </header>
    )
}