import cluster from 'node:cluster';
import os from 'node:os';
import http from 'node:http';
import dotenv from 'dotenv';
import { UserManager } from './UserManager/UserManager.ts';
import type { User } from './UserManager/type.ts';

export function runClaster(): void {
    dotenv.config();
    const PORT = parseInt(process.env.PORT ?? '4000', 10);

    const userManager = new UserManager();

    const cpusNumber = os.cpus().length;

    if (cluster.isPrimary) {
        console.log(`Master ${process.pid} is running`);

        for (const id in cluster.workers) {
            if (cluster.workers[id]) {
                cluster.workers[id]?.send({ type: 'updateUsers', users: userManager.users });
            }
        }

        for (let i = 0; i < cpusNumber - 1; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker) => {
            console.log(`Worker ${worker.process.pid} died`);
        });
    } else {
        const server = http.createServer((req, res) => {
            if (req.url === '/' && req.method === 'GET') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write('Welcome to CRUD API');
                res.end();
            } else if (req.url === '/api/users' && req.url.endsWith('/api/users') && req.method === 'GET') {
                userManager.getAllUsers(req, res);
            } else if (req.url?.startsWith('/api/users/') && req.method === 'GET') {
                userManager.getUser(req, res);
            } else if (req.url?.startsWith('/api/users/') && req.method === 'DELETE') {
                userManager.deleteUser(req, res);
            } else if (req.url?.startsWith('/api/users/') && req.method === 'PUT') {
                userManager.updateUser(req, res);
            } else if (req.url?.startsWith('/api/users') && req.url.endsWith('/api/users') && req.method === 'POST') {
                userManager.createUser(req, res);
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'ROUTE not found', wrongRoute: req.url }));
            }
        });

        const workerId = cluster.worker?.id ?? 0;
        server.listen(PORT + workerId, () => {
            console.log(`listening port http://localhost:${PORT + workerId}/`);
        });

        process.on('message', (message: { type: string; users?: User[] }) => {
            if (message.type === 'updateUsers' && message.users) {
                userManager.users = message.users;
            }
        });
    }
}
