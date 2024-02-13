import http from 'node:http';
import dotenv from 'dotenv';
import { UserManager } from 'UserManager/UserManager';

dotenv.config();
const PORT = process.env.PORT ?? 4000;

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write('Hello from NODE.js Api');
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'ROUTE not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`listening port http://localhost:${PORT}/`);
});
