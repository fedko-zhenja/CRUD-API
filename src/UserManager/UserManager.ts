import { type User } from './type';
import type http from 'node:http';
import { findUserByID } from '../helpers/findUserByID.ts';

export class UserManager {
    private readonly users: User[] = [];

    constructor() {
        this.users = [
            {
                id: '1',
                username: 'zhenja',
                age: 26,
                hobbies: ['learning'],
            },
            {
                id: '2',
                username: 'vadim',
                age: 27,
                hobbies: ['programming'],
            },
        ];
    }

    createUser = (): void => {
        console.log('createUser');
    };

    getAllUsers = (req: http.IncomingMessage, res: http.ServerResponse): void => {
        try {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(this.users));
        } catch {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Server error' }));
        }
    };

    getUser = (req: http.IncomingMessage, res: http.ServerResponse): void => {
        try {
            const user = findUserByID(req, this.users);
            console.log(user);
            if (user && user !== 'invalid id') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            } else if (user === undefined) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'The user was not found by the entered id.' }));
            } else if (user === 'invalid id') {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'userId is invalid' }));
            }
        } catch {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Server error' }));
        }
    };

    updateUser = (): void => {
        console.log('updateUser');
    };

    deleteUser = (): void => {
        console.log('deleteUser');
    };
}
