import http from 'node:http';
import dotenv from 'dotenv';
import { UserManager } from './UserManager/UserManager.ts';

dotenv.config();
const PORT = process.env.PORT ?? 4000;

const userManager = new UserManager();

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

server.listen(PORT, () => {
    console.log(`listening port http://localhost:${PORT}/`);
});
