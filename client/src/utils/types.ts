export interface User {
    id: number;
    username: string;
    avatarImage?: string;
    email: string;
    subscribe: boolean;
    online: boolean;
    canvas: Board[];
    teams: any;
    createdAt: string;
}

export interface Board {
    id: number;
    name: string;
    backgroundImage: string;
    owner: User;
    users: User[]
    isPrivate: boolean;
    
    components: Component[];
}

export interface Component {
    id: number;
    name: string;
    
    tasks: Task[]
}

export interface Task {
    id: number;
    name: string;
    deadline: string;
    
    tags: Tag[];
}

export interface Tag {
    id: number;
    name: string;
    color: string;
}