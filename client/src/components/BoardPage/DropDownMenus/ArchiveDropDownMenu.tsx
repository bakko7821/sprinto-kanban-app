import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import type { Board, Task } from "../../../utils/types"
import { BackIcon, CrossIcon, DoneIcon } from "../../../assets/icons"
import { TaskComponent } from "../TaskComponent"

interface ArchiveDropDownMenuProps {
    board: Board | null
    onDeleteTask: (id: number) => void;
    onClose: () => void;
}

export const ArchiveDropDownMenu = ({board, onDeleteTask, onClose}: ArchiveDropDownMenuProps) => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const [archivedTasks, setArchivedTasks] = useState<Task[]>([])

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

    useEffect(() => {
        async function fetchArchivedTasks() {
            if (!token || !userId || !board?.id) return

            try {
                const response = await axios.get(`http://localhost:5000/api/archive/${Number(board?.id)}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setArchivedTasks(response.data)

            } catch (err) {
                console.error("Ошибка при обновлении задачи", err);
            }
        }

        fetchArchivedTasks()
    }, [])

    return (
        <div ref={menuRef} className="archiveDropDown flex-column g8">
            <div className="archiveHeader flex-between">
                <span className="titleText">Архив</span>
                <button className="closeButton" onClick={onClose}><CrossIcon /></button>
            </div>
            <div className="tasksList flex-column g8">
                {archivedTasks.map((archivedTask) => (
                    <div className="taskMenu flex-column g4">
                        <TaskComponent 
                            task={archivedTask}
                            onDone={() => {}}
                            onUpdate={() => {}}
                            onDeleteTask={onDeleteTask}/>
                        <div className="buttonsBox flex g8">
                            <button className="recoveryButton">Восстановить</button>
                            <div className="circle"></div>
                            <button className="deleteButton" onClick={() => onDeleteTask(archivedTask.id)}>Удалить</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}