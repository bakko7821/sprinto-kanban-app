import { useEffect, useRef } from "react";
import { CrossIcon } from "../../../assets/icons";

interface ColumnDropDownMenuProps {
    onClose: () => void;
    onDelete: () => void;
}

export const ColumnDropDownMenu = ({onClose, onDelete}: ColumnDropDownMenuProps) => {

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

    return (
        <div ref={menuRef} className="columnDropDownMenu flex-column g12">
            <div className="columnDropDownMenuHeader flex-between">
                <span>Действия со столбцом</span>
                <button className="closeMenu flex-center" onClick={() => onClose()}><CrossIcon /></button>
            </div>
            <nav className="columnDropDownMenuNavigation flex-column g8">
                <button className="add">Добавить задачу</button>
                <button className="">Архивировать список</button>
                <button className="">Архивировать все задачи из списка</button>
                <button className="deleteButton" onClick={onDelete}>Удалить список</button>
            </nav>
        </div>
    )
}