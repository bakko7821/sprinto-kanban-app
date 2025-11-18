export interface User {
    id: number;
    username: string;
    avatarImage?: string;
    email: string;
    subscribe: boolean;
    online: boolean;
    canvas: Board[];
    notifications:Notification[]; 
    teams: any;
    createdAt: string;
}

export interface Notification {
    id: number;
    read: boolean;
    content: string;
}

export interface Board {
    id: number;
    name: string;
    backgroundImage: string;
    owner: User;
    users: User[]
    isPrivate: boolean;
    
    components: Column[];
}

export interface Column {
    id: number;
    name: string;
    
    tasks: Task[]
}

export interface Task {
    id: number;
    name: string;
    deadline: string;
    isDone: boolean;
    
    tags: number[];
}

export interface Tag {
    id: number;
    name: string;
    color: string;
}