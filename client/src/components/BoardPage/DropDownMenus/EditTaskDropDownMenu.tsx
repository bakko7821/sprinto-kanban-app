import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArchiveIcon, CopyIcon, ErrorIcon, OpenIcon, SuccesIcon, TagsIcon, TimeAddIcon, TrashIcon, UnknowUserIcon } from "../../../assets/icons"
import type { Task } from "../../../utils/types";
import { ChangeTagsDropDownMenu } from "./ChangeTagsDropDownMenu";
import { ConfirmAlert } from "../../Alerts/ConfirmAlert";
import { SetDateDropDownMenu } from "./SetDateDropDownMenu";
import { NotificationAlert } from "../../Alerts/NotificationAlert";
import { SetExecutorDropDownMenu } from "./SetExecutorDropDownMenu";

interface EditTaskDropDownMenuProps {
    taskRef: React.RefObject<HTMLDivElement | null>;
    boardId: number | undefined;
    task: Task
    onUpdate: (id: number, updated: Partial<Task>) => void;
    onClose: () => void;
    onSetDate: (result: string) => void;
    onSetExecutor: () => void;
    onChangeTags: (ids: number[]) => void;
    onDeleteTask: (id: number) => void;
}

export const EditTaskDropDownMenu = ({boardId, onSetDate, onUpdate, onClose, taskRef, task, onDeleteTask, onChangeTags}: EditTaskDropDownMenuProps ) => {
    const [isEditingTags, setIsEditingTags] = useState(false)
    const [isEditingDate, setIsEditingDate] = useState(false)
    const [isEditingExecutor, setIsEditingExecutor] = useState(false)
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState<ReactNode | null>(null);
            
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const menuEl = menuRef.current;
            const taskEl = taskRef.current;
            const target = e.target as Node;

            if (
                menuEl &&
                !menuEl.contains(target) &&
                taskEl &&
                !taskEl.contains(target)
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose, taskRef]);

    const handleCloseDropDown = () => {
        setIsEditingTags(false)
        setIsEditingDate(false)
        setIsEditingExecutor(false)
    }

    const copyToClipboard = async (text: string): Promise<void> => {
        try {
            await navigator.clipboard.writeText(text);

            setAlert(
                <NotificationAlert 
                    text="Задача скопированна!" 
                    icon={<SuccesIcon />} 
                />
            );

            setTimeout(() => setAlert(null), 4000);

        } catch (err) {
            console.error("Ошибка копирования:", err);

            setAlert(
                <NotificationAlert 
                    text="Ошибка копирования" 
                    icon={<ErrorIcon />}
                />
            );

            setTimeout(() => setAlert(null), 4000);
        }
    };


    return (
        <>
        <div 
            ref={menuRef} 
            className="editTaskDropDownMenu flex-column g8" 
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
        >
            <button className="openButton flex g8"><OpenIcon /> Открыть карту</button>
            <button className={`changeTagsButton flex g8 ${!isEditingTags ? "" : "active"}`} onClick={() => {setIsEditingTags((prev) => !prev)}}><TagsIcon /> Изменить метки</button>
            <button className={`selectDeadlineButton flex g8 ${!isEditingExecutor ? "" : "active"}`} onClick={() => {setIsEditingExecutor((prev) => !prev)}}><UnknowUserIcon /> Назначить исполнителя</button>
            <button className={`selectDeadlineButton flex g8 ${!isEditingDate ? "" : "active"}`} onClick={() => {setIsEditingDate((prev) => !prev)}}><TimeAddIcon /> Указать дедлайн</button>
            <button className="copyButton flex g8" onClick={() => copyToClipboard(task.name)}><CopyIcon /> Копировать</button>
            <button className="archiveButton flex g8" onClick={() => onUpdate(task.id, {isArchive: true})}><ArchiveIcon /> Архивировать</button>
            <button className="deleteButton flex g8" onClick={() => setShowAlert(true)}><TrashIcon /> Удалить</button>

            {showAlert && (
                <ConfirmAlert
                    text="Удалить эту задачу?"
                    onConfirm={() => {
                        setShowAlert(false);
                        onDeleteTask(task.id)
                    }}
                    onCancel={() => setShowAlert(false)}
                />
            )}

            {alert}

            {isEditingTags && (
                <ChangeTagsDropDownMenu onClose={handleCloseDropDown} task={task} onChangeTags={onChangeTags} />
            )}

            {isEditingDate && (
                <SetDateDropDownMenu onSetDate={onSetDate} onClose={handleCloseDropDown}/>
            )}

            {isEditingExecutor && (
                <SetExecutorDropDownMenu task={task} boardId={boardId} onUpdate={onUpdate} onClose={handleCloseDropDown}/>
            )}
        </div>
        </>
    )
}