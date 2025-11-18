import { useEffect, useRef } from "react";
import { ArchiveIcon, CopyIcon, OpenIcon, TagsIcon, TimeAddIcon, TrashIcon, UnknowUserIcon } from "../../../assets/icons"

interface EditTaskDropDownMenuProps {
    onClose: () => void;
    taskRef: React.RefObject<HTMLDivElement | null>;
}

export const EditTaskDropDownMenu = ({onClose, taskRef}: EditTaskDropDownMenuProps ) => {
    const menuRef = useRef<HTMLDivElement | null>(null);
            
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

    return (
        <>
        <div ref={menuRef} className="editTaskDropDownMenu flex-column g8">
            <button className="openButton flex g8"><OpenIcon /> Открыть карту</button>
            <button className="changeTagsButton flex g8"><TagsIcon /> Изменить метки</button>
            <button className="selectUserButton flex g8"><UnknowUserIcon /> Назначить исполнителя</button>
            <button className="selectDeadlineButton flex g8"><TimeAddIcon /> Указать дедлайн</button>
            <button className="copyButton flex g8"><CopyIcon /> Копировать</button>
            <button className="archiveButton flex g8"><ArchiveIcon /> Архивировать</button>
            <button className="deleteButton flex g8"><TrashIcon /> Удалить</button>
        </div>
        </>
    )
}