export interface User {
    id: number;
    email: string;
    password: string;
    role: string;
}

export const users: User[] = [];
