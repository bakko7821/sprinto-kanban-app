import { useParams } from "react-router-dom"
import { Login } from "../components/Auth/Login";
import { Register } from "../components/Auth/Register";
import { Recovery } from "../components/Auth/Recovery";
import { NotFound } from "../components/Auth/NotFound";
import { Background } from "../components/Auth/Background/Background";
import "../components/Auth/Auth.scss"

export const AuthPage = () => {
    const { type } = useParams();
    console.log(type)

    const renderComponent = () => {
        switch(type) {
            case "login":
                return <Login />;
            case "register":
                return <Register />;
            case "recovery":
                return <Recovery />;
            default:
                return null;
        }
    }

    return (
        <div className="authPage flex-center">
            <Background />
            {!renderComponent() ? (
                <NotFound />
            ) : (
                renderComponent()
            )}
        </div>
    )
}