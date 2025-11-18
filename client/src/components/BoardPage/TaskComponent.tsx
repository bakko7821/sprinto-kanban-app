import { useEffect, useRef, useState } from "react";
import type { Task } from "../../utils/types";
import { ArchiveIcon, CrossIcon, DoneIcon, EditIcon2 } from "../../assets/icons";
import { EditTaskDropDownMenu } from "./DropDownMenus/EditTaskDropDownMenu";

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
            tags,
            isDone
        });

        setIsEdit(false);
    };

    return (
        <>
        {!isEdit ? (null) : (<div className="backgroundBlur"></div>)}
        <div ref={taskRef} className={`taskComponent flex-column ${!isEdit ? "" : "active"}`}>
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
            <div className="taskTagsBox">

            </div>
            <div className="taskContent flex g4">
                {!isEdit ? (
                    <>
                    <div className={`checkbox flex-center ${!isDone ? "" : "active"}`} onClick={() => handleDone()}>
                        {!isDone ? (
                            null
                        ) : (
                            <DoneIcon />
                        )}
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
                <EditTaskDropDownMenu onClose={handleCloseDropDownMenu} taskRef={taskRef} task={task}/>
            )}
        </div>
        </>
    )
}