import { useState } from "react";
import type { Task } from "../../utils/types"
import { DoneIcon } from "../../assets/icons";

interface TaskComponentsProps {
    task: Task;
    onDone: () => void;
}

export const TaskComponent = ({task, onDone}: TaskComponentsProps) => {
    const [isDone, setIsDone] = useState(false)

    const handleDone = () => {
        setIsDone((prev) => !prev)
        onDone()
    }

    return (
        <div className="taskComponent flex-column">
            <div className="taskTagsBox">

            </div>
            <div className="taskContent flex g4">
                <div className={`checkbox flex-center ${!isDone ? "" : "active"}`} onClick={() => handleDone()}>
                    {!isDone ? (
                        null
                    ) : (
                        <DoneIcon />
                    )}
                </div>
                <span>{task.name}</span>
            </div>
        </div>
    )
}