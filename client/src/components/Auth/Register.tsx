import type { AxiosError } from "axios"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { KeyIcon } from "../../assets/icons"

export const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                username,
                email,
                password
            });


            localStorage.setItem("token", response.data.token);
            localStorage.setItem("authUser", JSON.stringify(response.data.user));

            setMessage(response.data.msg ?? `Добро пожаловать, ${response.data.user.username}!`);
            navigate("/");
            window.location.reload();
        } catch (err) {
            const axiosErr = err as AxiosError<{ msg?: string }>;
            setMessage(axiosErr?.response?.data?.msg ?? "Ошибка");
        }
    };

    return (
        <div className="registerComponent flex-column flex-center g16">
            <span className="titleText">Авторизация</span>
            <form onSubmit={handleSubmit} className="loginForm flex-column g12">
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
                <div className="floating-input">
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Пароль"/>
                    <label htmlFor="password">Пароль</label>
                </div>
                <button className="handleSubmitButton flex-center g4" onClick={() => handleSubmit}><KeyIcon /> Регистрация</button>
                <Link to={"/auth/login"}>у меня уже есть аккаунт</Link>
            </form>

            {message && (
                <div className="notificationMessage flex-center">
                <p>{message}</p>
                </div>
            )}
        </div>
    )
}