import type { ReactNode } from "react";
import "../../styles/alerts.scss";

interface NotificationAlertProps {
    text: string;
    icon?: ReactNode;
}

export const NotificationAlert = ({text, icon}: NotificationAlertProps) => {
    return (
        <div className="notificationAlert">
            <div className="notificationAlertContent flex-center g8">
                {icon}
                <span>{text}</span>
            </div>
        </div>
    )
}