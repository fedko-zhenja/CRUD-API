import { type User } from './type';

export class UserManager {
    private readonly users: User[] = [];

    constructor() {
        this.users = [];
    }

    createUser = (): void => {
        console.log('createUser');
    };

    getAllUsers = (): void => {
        console.log('getAllUsers');
    };

    getUser = (): void => {
        console.log('getUser');
    };

    updateUser = (): void => {
        console.log('updateUser');
    };

    deleteUser = (): void => {
        console.log('deleteUser');
    };
}
