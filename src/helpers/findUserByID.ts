/* eslint-disable no-useless-escape */
import type http from 'node:http';
import type { User } from 'UserManager/type';

export function findUserByID(req: http.IncomingMessage, usersArray: User[]): User | undefined | string {
    const userId = req.url?.match(/\/([^\/]+)\/?$/);

    if (userId?.[1]) {
        const res = usersArray.find((user) => user.id === userId?.[1]);

        return res;
    } else {
        return 'invalid id';
    }
}
