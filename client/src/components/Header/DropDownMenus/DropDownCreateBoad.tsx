import { useEffect, useRef, useState } from "react";
import { CrossIcon, EyeIcon, LockIcon } from "../../../assets/icons";
import { VisibilitySelect } from "./VisibilitySelect";

interface DropDownCreateBoardProps {
    onClose: () => void;
}

export const DropDownCreateBoard = ({ onClose }: DropDownCreateBoardProps) => {
    const [boardName, setBoardName] = useState("")
    const [visibility, setVisibility] = useState("public")
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Имя: ${boardName}, Видимость: ${visibility}`)
    }

    return (
        <div ref={menuRef} className="dropDownCreateBoard flex-column g8">
            <div className="headerBox flex-between">
                <span className="headingText">Создать доску</span>
                <button className="closeMenuButton" onClick={onClose}><CrossIcon /></button>
            </div>
            <form className="flex-column g8" onSubmit={handleSubmit}>
                <div className="nameBox flex-column g4">
                    <label htmlFor="name">Заголовок доски</label>
                    <input 
                        type="text"
                        id="name"
                        value={boardName}
                        onChange={(e) => setBoardName(e.target.value)} 
                        placeholder="My Board"/>
                    <span>👋 Укажите название доски.</span>
                </div>
                <div className="plug"></div>
                <div className="visibilityBox flex-column g4">
                    <label htmlFor="select">Видимость</label>
                    <VisibilitySelect value={visibility} onChange={setVisibility}/>
                </div>
                <button className="createBoardButton" onClick={() => handleSubmit}>Создать</button>
            </form>
        </div>
    )
}