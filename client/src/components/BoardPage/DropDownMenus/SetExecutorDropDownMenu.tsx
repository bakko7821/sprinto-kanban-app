import { use, useEffect, useState } from "react";
import { CrossIcon } from "../../../assets/icons";
import axios from "axios";
import type { Task, User } from "../../../utils/types";
import { UserAvatar } from "../../userAvatar";

interface SetExecutorDropDownMenuProps {
    task: Task;
    onClose: () => void;
    boardId: number | undefined;
    onUpdate: (id: number, updated: Partial<Task>) => void;
}

export const SetExecutorDropDownMenu = ({task, onUpdate, onClose, boardId}: SetExecutorDropDownMenuProps) => {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    const [team, setTeam] = useState<number[]>([])
    const [users, setUsers] = useState<User[]>([])

    async function fetchTeam() {
        if (!token || !userId || !boardId) return;
        if (boardId === undefined) return

        try {
            const response = await axios.get(`http://localhost:5000/api/boards/team/${boardId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })

            setTeam(response.data)
        } catch (err) {
            console.error("Ошибка при загрузке команды:", err);
        }
    }

    async function fetchUsers(team: number[]) {
        if (!token || !userId || !boardId) return;

        try {
            const usersData = await Promise.all(
                team.map(async (userId) => {
                    const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    return response.data; // должен быть объект User
                })
            )

            setUsers(usersData) // users теперь точно массив
        } catch (err) {
            console.error("Ошибка при загрузке пользователей:", err);
        }
    }

    useEffect(() => {
        fetchTeam()
    }, [boardId])

    useEffect(() => {
        if (team.length > 0) {
            fetchUsers(team)
        }
    }, [team])

    const handleSetExecutor = (user: User) => {
        onUpdate(task.id, {executorIds: [...task.executorIds, user.id]})
    }

    return (
        <div className="setExecutorDropDownMenu flex-column">
            <div className="setExecutorHeader flex-between g8">
                <span>Назначить исполнителя</span>
                <button className="closeMenu flex-center" onClick={() => onClose()}><CrossIcon /></button>
            </div>
            {users.length === 0 ? (
                <span className="nullMessage">У вас пустая команада</span>
            ) : (
                <div className="usersList flex-column">
                    {users.map((user) => (
                        <div className="userBox flex g8" key={user.id} onClick={() => handleSetExecutor(user)}>
                            <UserAvatar user={user}/>
                            <div className="textBox flex-column">
                                <span className="usernameText">{user.username}</span>
                                <span className="emailText">{user.email}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}