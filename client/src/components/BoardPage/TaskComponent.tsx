import { useEffect, useRef, useState } from "react";
import type { Tag, Task } from "../../utils/types";
import { ArchiveIcon, CrossIcon, DoneIcon, EditIcon2 } from "../../assets/icons";
import { EditTaskDropDownMenu } from "./DropDownMenus/EditTaskDropDownMenu";
import axios from "axios";

interface TaskComponentsProps {
    task: Task;
    onDone: () => void;
    onUpdate: (id: number, updated: Partial<Task>) => void;
}

export const TaskComponent = ({task, onDone, onUpdate}: TaskComponentsProps) => {
    const [isDone, setIsDone] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [taskName, setTaskName] = useState("")
    const [deadline, setDeadline] = useState("")
    const [tags, setTags] = useState<number[]>([])
    const [renderTags, setRenderTags] = useState<Tag[]>([]);
    const taskRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setTaskName(`${task.name}`)
    }, [])

    const handleDone = () => {
        setIsDone((prev) => !prev)
        onDone()
    }
    
    const handleCloseDropDownMenu = () => {
        setIsEdit(false)
    }

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();

        onUpdate(task.id, {
            name: taskName,
            deadline,
            tags: tags,
            isDone
        });

        setIsEdit(false);
    };

    async function loadTagsByIds(ids: number[]) {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const requests = ids.map(id =>
                axios.get(`http://localhost:5000/api/tags/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
            );

            const responses = await Promise.all(requests);

            const tagsData = responses.map(res => res.data);

            setRenderTags(tagsData);

        } catch (err) {
            console.error("Ошибка при загрузке тегов:", err);
        }
    }

    useEffect(() => {
        if (task.tags && task.tags.length > 0) {
            loadTagsByIds(task.tags);
        }
    }, [task.tags]);

    return (
        <>
        {!isEdit ? (null) : (<div className="backgroundBlur"></div>)}
        <div ref={taskRef} className={`taskComponent flex-column g6 ${!isEdit ? "" : "active"}`}>
            {!isDone ? (
                <div className="buttonsBox flex-center g4">
                    <button 
                        className="editButton flex-center" 
                        onClick={() => setIsEdit((prev) => !prev)}>
                            <EditIcon2 />
                    </button>
                </div>
            ) : (
                <div className="buttonsBox flex-center g4">
                    <button className="archiveButton flex-center"><ArchiveIcon /></button>
                    <button 
                        className="editButton flex-center" 
                        onClick={() => setIsEdit((prev) => !prev)}>
                            <EditIcon2 />
                    </button>
                </div>
            )}
            <div className="taskTagsBox flex g6">
                {renderTags.map(tag => (
                    <div
                        key={tag.id}
                        className="tagPreview"
                        style={{ backgroundColor: tag.color }}
                    >
                    </div>
                ))}
            </div>
            <div className="taskContent flex g4">
                {!isEdit ? (
                    <>
                    <div className={`checkbox flex-center ${!isDone ? "" : "active"}`} onClick={() => handleDone()}>
                        {!isDone ? null : <DoneIcon />}
                    </div>
                    <span>{task.name}</span>
                    </>
                ) : (
                    <form className="editTaskForm flex-column g4" onSubmit={handleSaveChanges}>
                        <input 
                            type="text" 
                            className="editTaskInput"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)} 
                        />
                        <div className="formButtonsBox flex-center g8">
                            <button 
                                className="createTaskButton flex-center" 
                                onClick={() => handleSaveChanges}><DoneIcon /></button>
                            <button 
                                className="closeFormButton flex-center" 
                                onClick={() => {setIsEdit((prev) => !prev)}}><CrossIcon /></button>
                        </div>
                    </form>
                )}
            </div>

            {!isEdit ? (
                null
            ) : (
                <EditTaskDropDownMenu onClose={handleCloseDropDownMenu} taskRef={taskRef} task={task} onChangeTags={(ids) => setTags(ids)}/>
            )}
        </div>
        </>
    )
}