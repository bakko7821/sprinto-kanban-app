export interface User {
    id: number;
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