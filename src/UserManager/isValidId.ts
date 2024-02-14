import type http from 'node:http';

export function isValidId(req: http.IncomingMessage): number | null {
    const regex = /\/(\d+)$/;
    const userNum = req.url?.match(regex);

    return userNum ? Number(userNum[1]) : null;
}
