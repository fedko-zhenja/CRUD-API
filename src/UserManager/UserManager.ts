import { type User, type NewData } from './type';
import type http from 'node:http';
import { findUserByID } from '../helpers/findUserByID.ts';
import { findIndexByID } from '../helpers/findIndexByID.ts';
import { deleteUser } from '../helpers/deleteUser.ts';
import { updateUserData } from '../helpers/updateUserData.ts';
import { hasRequiredFields } from '../helpers/hasRequiredFields.ts';
import { isValidId } from '../helpers/isValidId.ts';

export class UserManager {
    readonly users: User[] = [];

    constructor() {
        this.users = [
            {
                id: '4881182c-af46-40bb-b652-6608cfbc37ff',
                username: 'zhenja',
                age: 26,
                hobbies: ['learning'],
            },
            {
                id: '7881132c-af16-40bb-b652-5708cfbc37ff',
                username: 'vadim',
                age: 27,
                hobbies: ['programming'],
            },
        ];
    }

    createUser = (req: http.IncomingMessage, res: http.ServerResponse): void => {
        let bodyReq = '';

        req.on('data', (data) => {
            bodyReq += data;
        });

        req.on('end', () => {
            try {
                const user = findUserByID(req, this.users);

                const dataPars: NewData = JSON.parse(bodyReq);
                const hasReqFields = hasRequiredFields(dataPars);

                if (!user && hasReqFields) {
                    this.users.push(dataPars as User);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'user data updated', currentUsers: this.users }));
                } else if (!hasReqFields) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'does not contain required fields' }));
                }
            } catch {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Server error' }));
            }
        });
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
            if (isValidId(req)) {
                const user = findUserByID(req, this.users);

                if (user) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(user));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'The user was not found by the entered id.' }));
                }
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'userId is invalid' }));
            }
        } catch {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Server error' }));
        }
    };

    updateUser = (req: http.IncomingMessage, res: http.ServerResponse): void => {
        let bodyReq = '';

        req.on('data', (data) => {
            bodyReq += data;
        });

        req.on('end', () => {
            try {
                if (isValidId(req)) {
                    const user = findUserByID(req, this.users);

                    if (user) {
                        const index = findIndexByID(user, this.users);

                        const dataPars: NewData = JSON.parse(bodyReq);

                        updateUserData(index, dataPars, this.users);

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'user data updated', currentUsers: this.users }));
                    } else {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'The user was not found by the entered id.' }));
                    }
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'userId is invalid' }));
                }
            } catch {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Server error' }));
            }
        });
    };

    deleteUser = (req: http.IncomingMessage, res: http.ServerResponse): void => {
        try {
            if (isValidId(req)) {
                const user = findUserByID(req, this.users);

                if (user) {
                    const index = findIndexByID(user, this.users);
                    deleteUser(index, this.users);

                    res.writeHead(204, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'user deleted', currentUsers: this.users }));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'The user was not found by the entered id.' }));
                }
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'userId is invalid' }));
            }
        } catch {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Server error' }));
        }
    };
}
