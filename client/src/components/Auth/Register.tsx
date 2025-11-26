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
            await axios.post("http://localhost:5000/api/auth/register", {
                username,
                email,
                password
            });

            await handleLogin(username, password);
        } catch (error) {
            const axiosErr = error as AxiosError<{ msg?: string }>;
            setMessage(axiosErr?.response?.data?.msg ?? "Ошибка");
        }
    };


    const handleLogin = async (loginUsername: string, loginPassword: string) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                username: loginUsername,
                password: loginPassword
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.id);

            setMessage(response.data.msg ?? `Добро пожаловать`);
            navigate("/");
        } catch (error: unknown) {
            const axiosErr = error as AxiosError<{ msg?: string }>;
            setMessage(axiosErr?.response?.data?.msg ?? "Ошибка");
        }
    };


    return (
        <div className="registerComponent flex-column flex-center g16">
            <span className="titleText">Регистрация</span>
            <form onSubmit={handleSubmit} className="registerForm flex-column g12">
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
                <button className="handleSubmitButton flex-center g4" type="submit"><KeyIcon /> Регистрация</button>
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