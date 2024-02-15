import { validate } from 'uuid';
import type http from 'node:http';

export function isValidId(req: http.IncomingMessage): boolean {
    const userId = req.url?.match(/([^/]+)$/);

    let res = false;

    if (userId?.[1]) {
        validate(userId?.[1]) ? (res = true) : (res = false);
    }

    return res;
}
