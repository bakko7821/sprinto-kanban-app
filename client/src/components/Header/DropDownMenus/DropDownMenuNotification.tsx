import { useEffect, useRef, useState } from "react";

interface DropDownMenuNotificationProps {
    onClose: () => void;
    userId: number | undefined;
}

export const DropDownMenuNotification = ({onClose, userId}: DropDownMenuNotificationProps) => {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [notification, setNotification] = useState<Notification[]>([])
    
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div ref={menuRef} className="dropDownMenuNotification flex-column g8">
            <span>Уведомления</span>
        </div>
    )
}