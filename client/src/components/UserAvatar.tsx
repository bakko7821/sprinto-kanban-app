import '../styles/index.scss'
import type { User } from '../utils/types';

interface UserAvatarProps {
    user: User | null;
}

export const UserAvatar = ({user}: UserAvatarProps) => {
    return (
        <div className="userAvatar">
            <div className="glow"></div>
            <div className="avatarContent flex-center">
                {user?.avatarImage ? 
                <img src={`http://localhost:5000${user.avatarImage}`} alt={user?.username} /> : 
                <span>{user?.username ? user?.username[0] : ""}</span>}
            </div>
        </div>
    )
}