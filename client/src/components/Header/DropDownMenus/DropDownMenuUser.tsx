import { useEffect, useRef } from "react";
import type { User } from "../../../utils/types";
import { useLogout } from "../../../hooks/LogoutContext";

interface DropDownMenuUserProps {
    onClose: () => void;
    user: User | null;
}

export const DropDownMenuUser = ({ onClose, user }: DropDownMenuUserProps) => {
    const { setIsLoggedOut } = useLogout();
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleLogOut = () => {
        localStorage.clear();
        setIsLoggedOut(true);
        setTimeout(() => window.location.reload(), 1000);
    }

    return (
        <div ref={menuRef} className="dropDownMenuUser flex-column g8">
            <span className="headingText">Учетная запись</span>
            <div className="userInfoBox flex-column">
                <span className="username">us: {user?.username}</span>
                <span className="email">{user?.email}</span>
            </div>
            <span className="plug"></span>
            <span className="headingText">Sprinto</span>
            <div className="buttonsBox flex-column g4">
                <button className="dropDownMenuButton" id="editProfile">Изменить профиль</button>
                <button className="dropDownMenuButton" id="createBoard">Создать доску</button>
                <button className="dropDownMenuButton" id="changeTheme">Выбор темы</button>
            </div>
            <span className="plug"></span>
            <div className="buttonsBox flex-column g4">
                <button className="dropDownMenuButton" id="logOut" onClick={handleLogOut}>Выйти</button>
            </div>
        </div>
    )
}