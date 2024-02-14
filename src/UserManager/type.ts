export interface User {
    id: string;
    username: string;
    age: number;
    hobbies: string[] | [];
}

export interface NewData {
    id?: string;
    username?: string;
    age?: number;
    hobbies?: string[] | [];
}
