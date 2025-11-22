import { useEffect, useRef, useState } from "react";
import { CrossIcon, DoneIcon, LockIcon, PlanetIcon } from "../../../assets/icons";

interface ChangeVisibilityDropDownMenuProps {
    onClose: () => void;
    onUpdatePrivate: (type: string) => void;
}

export const ChangeVisibilityDropDownMenu = ({onClose, onUpdatePrivate}: ChangeVisibilityDropDownMenuProps) => {
    const [isPrivate, setIsPrivate] = useState(false) 
    const menuRef = useRef<HTMLDivElement | null>(null);
                    
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
        <div ref={menuRef} className="changeVisibilityDropDownMenu flex-column">
            <div className="changeVisibilityHeader flex-between g8">
                <span>Изменение видимости</span>
                <button className="closeMenu" onClick={() => onClose()}><CrossIcon /></button>
            </div>
            <div className="setVisibilityList flex-column">
                <div className="visibilityInfo private flex-column g8" onClick={() => {onUpdatePrivate('private'), setIsPrivate(false)}}>
                    <div className="visibilityInfoHeader flex g8">
                        <LockIcon />
                        <span>Приватная</span>
                        {!isPrivate ? <DoneIcon /> : null}
                    </div>
                    <div className="visibilityDescription">
                        Просматривать эту доску могут только ее участники. Администраторы рабочего пространства могут закрывать доску и удалять участников.
                    </div>
                </div>
                <div className="visibilityInfo public flex-column g8" onClick={() => {onUpdatePrivate('public'), setIsPrivate(true)}}>
                    <div className="visibilityInfoHeader flex g8">
                        <PlanetIcon />
                        <span>Публичная</span>
                        {!isPrivate ? null : <DoneIcon />}
                    </div>
                    <div className="visibilityDescription">
                        Просматривать эту доску могут все, а изменять — только ее участники.
                    </div>
                </div>
            </div>
        </div>
    )
}