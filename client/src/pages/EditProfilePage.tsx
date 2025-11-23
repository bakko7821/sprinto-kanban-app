import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import type { User } from "../utils/types"
import axios from "axios"
import { UserAvatar } from "../components/UserAvatar"
import '../styles/editProfilePage.scss'
import { UploadIcon } from "../assets/icons"

export const EditProfilePage = () => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const {id} = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null)
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    async function fetchUser() {
        try {
            const res = await axios.get(`http://localhost:5000/api/users/${Number(id)}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser(res.data);
            setUsername(res.data.username)
            setEmail(res.data.email)
        } catch (err) {
            console.error("Ошибка при загрузке пользователя:", err);
        }
    }

    async function fetchUpdateUser() {
        try {
            const res = await axios.put(`http://localhost:5000/api/users/${Number(id)}`,
                {   username: username,
                    email: email,
                    avatarImage: avatarUrl
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setUser(res.data);
            setUsername(res.data.username)
            setEmail(res.data.email)
            setAvatarUrl(res.data.avatarImage)
        } catch (err) {
            console.error("Ошибка при загрузке пользователя:", err);
        }
    }

    useEffect(() => {
        if(!userId || !id || !token) return

        if (Number(userId) === Number(id)) {
            fetchUser()
        } else {
            setUser(null) 
        }
             
    }, [id, avatarUrl])

    const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch("http://localhost:5000/api/upload/image", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        const uploadedUrl = data.url;
        console.log(uploadedUrl)

        setAvatarUrl(uploadedUrl);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!username || !email || !avatarUrl) return

        fetchUpdateUser()

        navigate("/")
    }
    

    return (
        <div className="editProfilePage flex g12">
            {user ? (
                <div className="userInfo flex-center g12">
                    <div className="avatarImage">
                        {avatarUrl ? 
                            (<div className="userAvatarPreview">
                                    <img src={`http://localhost:5000${avatarUrl}`} alt={user?.username} />
                                </div>
                            ) :
                            (<UserAvatar user={user} />)}
                        <input
                            type="file"
                            id="backgroundUploadInput"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleUploadAvatar}
                        />
                        <button 
                            className="uploadAvatarButton flex-center"
                            type="button"
                            onClick={() => fileInputRef.current?.click()}>
                            <UploadIcon />
                        </button>
                    </div>
                    <div className="text">
                        <form className="flex-column g12" onSubmit={handleFormSubmit}>
                            <div className="floating-input">
                                <input 
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="@Имя пользователя"/>
                                <label htmlFor="username">@Имя пользователя</label>
                            </div>
                            <div className="floating-input">
                                <input 
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Почта"/>
                                <label htmlFor="email">Почта</label>
                            </div>
                            <button className="saveChangesButton" type="submit">
                                Сохранить изменения
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="nullMessage flex-column g4">
                    <span className="nullMessage">Вы не можете редактировать чужой профиль</span>
                    <Link to={`/edit-profile/${userId}`}>перейти на мой профиль</Link>
                </div>
            )}
        </div>
    )
}