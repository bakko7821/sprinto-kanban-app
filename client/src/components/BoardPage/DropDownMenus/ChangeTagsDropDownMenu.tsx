import { useEffect, useState } from "react";
import { BackIcon, CrossIcon, EditIcon3 } from "../../../assets/icons";
import type { Tag, Task } from "../../../utils/types";
import { PickColor } from "../PickColorComponent";
import axios from "axios";

interface ChangeTagsDropDownMenuProps {
    onClose: () => void;
    task: Task;
}

export const ChangeTagsDropDownMenu = ({onClose, task}: ChangeTagsDropDownMenuProps) => {
    const [isCreatingNewTag, setIsCreatingNewTag] = useState(false)
    const [newTagName, setIsNewTagName] = useState("")
    const [newTagColor, setIsNewTagColor] = useState("")
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    
    const [tags, setTags] = useState<Tag[]>([])

    const handleCreateTag = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!token || !userId ) return;

        try {
            await axios.post(
                `http://localhost:5000/api/tags/create/${userId}`,
                { name: newTagName, color: newTagColor },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setIsNewTagName("");
            setIsNewTagColor("");
            setIsCreatingNewTag(false);

            const res = await axios.get(
                `http://localhost:5000/api/tags/all/${userId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setTags(res.data);

        } catch (err) {
            console.error("Ошибка при создании нового тега:", err);
        }
    }

    useEffect(() => {
        async function fetchTasks() {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/tags/all/${userId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                setTags(res.data);
            } catch (err) {
                console.error("Ошибка при создании задачи:", err);
            }
        }

        fetchTasks()
    }, [])

    return (
        <div className={`changeTagsDropDownMenu flex-column g12 ${!isCreatingNewTag ? "" : "edit"}`}>
            {!isCreatingNewTag ? (
                <>
                <div className="changeTagsHeader flex-between g8">
                    <span>Метки</span>
                    <button className="closeMenu flex-center" onClick={() => onClose()}><CrossIcon /></button>
                </div>
                <div className="tagsList flex-column g8">
                {tags.map((tag) => {
                    return <div key={tag.id} className="tagComponent flex-center g8">
                        <div className="checkbox"></div>
                        <div 
                            className="tagContent"
                            style={{ backgroundColor: tag.color }}
                        >
                            {tag.name}
                        </div>
                        <button className="editTagButton flex-center"><EditIcon3 /></button>
                    </div>
                })}
                </div>
                <button className="createTagButton flex-center" onClick={() => {setIsCreatingNewTag((prev) => !prev)}}>
                    Создать новую метку
                </button>
                </>
            ) : (
                <>
                <div className="changeTagsHeader flex-between g8">
                    <button className="backButton flex-center" onClick={() => {setIsCreatingNewTag((prev) => !prev)}}><BackIcon /></button>
                    <span>Создание метки</span>
                    <button className="closeMenu flex-center" onClick={() => onClose()}><CrossIcon /></button>
                </div>
                <div className="newTagPreview">
                    <div 
                        className="newTagComponent flex" 
                        style={{ backgroundColor: newTagColor }}
                    >
                        {newTagName}    
                    </div>
                </div>
                <form className="newTagForm flex-column g12" onSubmit={handleCreateTag}>
                    <label htmlFor="name">Название</label>
                    <input 
                        type="text" 
                        id="name"
                        value={newTagName}
                        onChange={(e) => setIsNewTagName(e.target.value)}/>
                    <label htmlFor="color">Цвет</label>
                    <PickColor onSelect={setIsNewTagColor}/>
                    <button className="createNewTagButton flex-center" onClick={() => handleCreateTag}>Создать новую метку</button>
                </form>
                </>
            )}
        </div>
    )
}