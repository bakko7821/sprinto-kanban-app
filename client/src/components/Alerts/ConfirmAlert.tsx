import ReactDOM from "react-dom";
import "../../styles/alerts.scss";

interface ConfirmAlertProps {
    text: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmAlert = ({ text, onConfirm, onCancel }: ConfirmAlertProps ) => {
    return ReactDOM.createPortal(
        <div className="ConfirmAlertOverlay flex-center">
            <div className="ConfirmAlert flex-column g12">
                <span>{text}</span>
                <div className="buttonsBox flex-center g8">
                    <button onClick={onConfirm}>Да</button>
                    <button onClick={onCancel} className="cancelButton">Нет</button>
                </div>
            </div>
        </div>,
        document.body
    );
};
