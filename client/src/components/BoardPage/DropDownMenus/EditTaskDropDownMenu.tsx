import { useEffect, useRef, useState } from "react";
import { ArchiveIcon, CopyIcon, OpenIcon, TagsIcon, TimeAddIcon, TrashIcon, UnknowUserIcon } from "../../../assets/icons"
import type { Task } from "../../../utils/types";
import { ChangeTagsDropDownMenu } from "./ChangeTagsDropDownMenu";
import axios from "axios";
import { ConfirmAlert } from "../../Alerts/ConfirmAlert";

interface EditTaskDropDownMenuProps {
    taskRef: React.RefObject<HTMLDivElement | null>;
    task: Task
    onClose: () => void;
    onChangeTags: (ids: number[]) => void;
    onDeleteTask: (id: number) => void;
}

export const EditTaskDropDownMenu = ({onClose, taskRef, task, onDeleteTask, onChangeTags}: EditTaskDropDownMenuProps ) => {
    const [isEditingTags, setIsEditingTags] = useState(false)
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [showAlert, setShowAlert] = useState(false)
            
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
    }

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
            <button className="selectUserButton flex g8"><UnknowUserIcon /> Назначить исполнителя</button>
            <button className="selectDeadlineButton flex g8"><TimeAddIcon /> Указать дедлайн</button>
            <button className="copyButton flex g8"><CopyIcon /> Копировать</button>
            <button className="archiveButton flex g8"><ArchiveIcon /> Архивировать</button>
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

            {isEditingTags && (
                <ChangeTagsDropDownMenu onClose={handleCloseDropDown} task={task} onChangeTags={onChangeTags} />
            )}
        </div>
        </>
    )
}