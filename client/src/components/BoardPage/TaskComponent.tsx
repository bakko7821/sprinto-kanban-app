import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import type { Tag, Task } from "../../utils/types";
import { ArchiveIcon, CrossIcon, DoneIcon, EditIcon2 } from "../../assets/icons";
import { EditTaskDropDownMenu } from "./DropDownMenus/EditTaskDropDownMenu";
import axios from "axios";
import { useDraggable } from "@dnd-kit/core";
import './taskComponent.scss'

interface TaskComponentsProps {
    task: Task;
    onDone: () => void;
    onUpdate: (id: number, updated: Partial<Task>) => void;
    onDeleteTask: (id: number) => void;
}

export const TaskComponent = ({task, onDone, onDeleteTask, onUpdate}: TaskComponentsProps) => {
    const [isDone, setIsDone] = useState(task.isDone)
    const [isArchive, setIsArchive] = useState(task.isArchive)
    const [isEdit, setIsEdit] = useState(false)
    const [taskName, setTaskName] = useState(task.name)
    const [deadline, setDeadline] = useState(task.deadline)
    const [tagsId, setTagsId] = useState<number[]>(task.tags)
    const [renderTags, setRenderTags] = useState<Tag[]>([]);

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: task.id,
        disabled: isEdit,
    });

    useEffect(() => {
        setTaskName(`${task.name}`)
        setIsDone(task.isDone)
    }, [])

    useEffect(() => {
        loadTagsByIds(tagsId)
    }, [])

    const handleDone = () => {
        setIsDone(prev => {
            const newValue = !prev;
            onUpdate(task.id, { isDone: newValue });
            return newValue;
        });
    };
    
    const handleCloseDropDownMenu = () => {
        setIsEdit(false)
    }

    const handleDropToArchive = () => {
        console.log(task.isArchive)

        setIsArchive(prev => {
            const newValue = !prev;
            onUpdate(task.id, { isArchive: newValue });
            return newValue;
        });
    }

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();

        onUpdate(task.id, {
            name: taskName,
            deadline,
        });

        setIsEdit(false);
    };

    const handleChangeTags = useCallback((ids: number[]) => {
        console.log(ids)

        onUpdate(task.id, {
            tags: ids
        });

        loadTagsByIds(ids)
    }, []);

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

    type PossibleRef<T> = React.Ref<T> | undefined;

    const taskRef = useRef<HTMLDivElement | null>(null);

    function mergeRefs<T>(...refs: PossibleRef<T>[]) {
        return (value: T) => {
            refs.forEach(ref => {
            if (!ref) return;

            if (typeof ref === "function") {
                ref(value);
            } else {
                // @ts-ignore — TS иногда тупит, но логика корректна
                ref.current = value;
            }
            });
        };
    }

    return (
        <>
        {!isEdit ? (null) : (<div className="backgroundBlur"></div>)}
        <div
            ref={mergeRefs<HTMLDivElement>(taskRef, setNodeRef)}
            {...listeners}
            {...attributes}
            draggable={true}
            className={`taskComponent flex-column g8 ${isDragging ? "dragging" : ""} ${isEdit ? "edited" : ""}`}
        >
            {task.isArchive ? null : (
                !isDone ? (
                    <div className="buttonsBox flex-center g4">
                        <button 
                            className="editButton flex-center" 
                            onMouseDown={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={() => setIsEdit(prev => !prev)}>
                                <EditIcon2 />
                        </button>
                    </div>
                ) : (
                    <div className="buttonsBox flex-center g4">
                        <button 
                            className="archiveButton flex-center"
                            onMouseDown={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={handleDropToArchive}>
                                <ArchiveIcon />
                        </button>
                        <button 
                            className="editButton flex-center" 
                            onMouseDown={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={() => setIsEdit(prev => !prev)}>
                                <EditIcon2 />
                        </button>
                    </div>
                )
            )}
            <div className="taskTagsBox flex g6">
                {renderTags.map((tag, index) => (
                    <div
                        key={tag.id ?? `tag-${index}`}
                        className="tagPreview"
                        style={{ backgroundColor: tag.color }}
                    />
                ))}
            </div>
            <div className="taskContent flex g4">
                {!isEdit ? (
                    <>
                    <div 
                        className={`checkbox flex-center ${!isDone ? "" : "active"}`} 
                        onMouseDown={(e) => e.stopPropagation()} 
                        onPointerDown={(e) => e.stopPropagation()} 
                        onClick={() => handleDone()}
                    >
                        {!isDone ? null : <DoneIcon />}
                    </div>
                    <span>{task.name}</span>
                    </>
                ) : (
                    <form 
                        className="editTaskForm flex-column g4" 
                        onSubmit={handleSaveChanges}
                        onMouseDown={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                    >
                        <input 
                            type="text" 
                            className="editTaskInput"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)} 
                        />
                        <div className="formButtonsBox flex-center g8">
                            <button 
                                onMouseDown={(e) => e.stopPropagation()}
                                onPointerDown={(e) => e.stopPropagation()}
                                className="createTaskButton flex-center" 
                                onClick={() => handleSaveChanges}><DoneIcon /></button>
                            <button 
                                onMouseDown={(e) => e.stopPropagation()}
                                onPointerDown={(e) => e.stopPropagation()}
                                className="closeFormButton flex-center" 
                                onClick={() => {setIsEdit((prev) => !prev)}}><CrossIcon /></button>
                        </div>
                    </form>
                )}
            </div>

            {!isEdit ? (
                null
            ) : (
                <EditTaskDropDownMenu onUpdate={onUpdate} onClose={handleCloseDropDownMenu} taskRef={taskRef} task={task} onDeleteTask={onDeleteTask} onChangeTags={handleChangeTags}/>
            )}
        </div>
        </>
    )
}