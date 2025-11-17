import type { User } from "../../utils/types";

interface DropDownMenuUserProps {
    onClose: () => void;
    user: User | null;
}
export const DropDownMenuUser = ({ onClose, user }: DropDownMenuUserProps) => {
    return (
        <div className="dropDownMenuUser">
            <span>{user?.username}</span>
            <span>{user?.email}</span>
        </div>
    )
}