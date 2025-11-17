import { useEffect, useRef } from "react";

interface DropDownMenuHelpProps {
    onClose: () => void;
}

export const DropDownMenuHelp = ({onClose}: DropDownMenuHelpProps) => {
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
        <div ref={menuRef} className="dropDownMenuHelp flex-column g8">
            <span>HELP</span>
        </div>
    )
}