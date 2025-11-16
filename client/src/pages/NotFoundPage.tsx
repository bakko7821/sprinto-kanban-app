import { Background } from "../components/Auth/Background/Background"
import { NotFound } from "../components/Auth/NotFound"
import "../components/Auth/Auth.scss"

export const NotFoundPage = () => {
    return (
        <div className="notFoundPage flex-center">
            <Background />
            <NotFound />
        </div>
    )
}