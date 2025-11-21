import { useEffect, useRef } from "react";
import { CrossIcon } from "../../../assets/icons";
import type { Column } from "../../../utils/types";
import axios from "axios";

interface ColumnDropDownMenuProps {
    column: Column
    onClose: () => void;
    fetchColumnsAndTasks: () => void;
    onDelete: () => void;
}

export const ColumnDropDownMenu = ({fetchColumnsAndTasks, column, onClose, onDelete}: ColumnDropDownMenuProps) => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
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

    const handleSetArchiveColumn = async() => {
        console.log('start')

        if (!token || !userId || !column) return

        await axios.put(
            `http://localhost:5000/api/tasks/columnId/${Number(column.id)}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );

        fetchColumnsAndTasks()

        console.log('end')
    }

    return (
        <div ref={menuRef} className="columnDropDownMenu flex-column g12">
            <div className="columnDropDownMenuHeader flex-between">
                <span>Действия со списком</span>
                <button className="closeMenu flex-center" onClick={() => onClose()}><CrossIcon /></button>
            </div>
            <nav className="columnDropDownMenuNavigation flex-column g8">
                <button className="archiveAll" onClick={() => handleSetArchiveColumn()}>Архивировать</button>
                <button className="deleteButton" onClick={onDelete}>Удалить</button>
            </nav>
        </div>
    )
}