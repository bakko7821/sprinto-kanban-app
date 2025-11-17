import { useState } from "react"
import { LogInIcon } from "../../assets/icons"
import { Link, useNavigate } from "react-router-dom"
import axios, { AxiosError } from "axios"

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                username,
                password
            });


            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.id);

            setMessage(response.data.msg ?? `Добро пожаловать`);
            navigate("/");
            window.location.reload();
        } catch (err) {
            const axiosErr = err as AxiosError<{ msg?: string }>;
            setMessage(axiosErr?.response?.data?.msg ?? "Ошибка");
        }
    };

    return (
        <div className="loginComponent flex-column flex-center g16">
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
                        type="password"
                        id="password"
                        name="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Пароль"/>
                    <label htmlFor="password">Пароль</label>
                </div>
                <button className="handleSubmitButton flex-center g4" onClick={() => handleSubmit}><LogInIcon /> Войти</button>
                <Link to={"/auth/register"}>пройти регистрацию</Link>
            </form>

            {message && (
                <div className="notificationMessage flex-center">
                <p>{message}</p>
                </div>
            )}
        </div>
    )
}