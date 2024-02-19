import request from 'supertest';
import { UserManager } from '../UserManager/UserManager';
import { type NewData } from '../UserManager/type';

describe('createUser method', () => {
    it('should create a new user', async () => {
        const userManagerInstance = new UserManager();

        const userData: NewData = {
            username: 'Maria',
            age: 20,
            hobbies: ['music'],
        };

        const response = await request(userManagerInstance.createUser).post('/createUser').send(userData);

        expect(response.status).toBe(201);
        expect(response.body.currentUsers).toHaveLength(3);
    });

    it('should return 400 for missing required fields', async () => {
        const userManagerInstance = new UserManager();

        const userData: NewData = {
            username: 'Maria',
        };

        const response = await request(userManagerInstance.createUser).post('/createUser').send(userData);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('does not contain required fields');
    });
});

describe('getAllUsers method', () => {
    it('should get all users', async () => {
        const userManagerInstance = new UserManager();

        const response = await request(userManagerInstance.getAllUsers).get('/getAllUsers');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    });
});

describe('getUser method', () => {
    it('should get user by valid ID', async () => {
        const userManagerInstance = new UserManager();

        const userToFind = userManagerInstance.users[0];

        const response = await request(userManagerInstance.getUser).get(`/api/users/${userToFind.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(userToFind);
    });

    it('should return 404 for missing ID', async () => {
        const userManagerInstance = new UserManager();

        const response = await request(userManagerInstance.getUser).get(`/api/users/4871582c-af46-40bb-b652-6708cfbc37ff`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('The user was not found by the entered id.');
    });

    it('should return 400 for invalid ID', async () => {
        const userManagerInstance = new UserManager();

        const response = await request(userManagerInstance.getUser).get('//api/users/1');

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('userId is invalid');
    });
});

describe('deleteUser method', () => {
    it('should delete user by valid ID', async () => {
        const userManagerInstance = new UserManager();

        const userToFind = userManagerInstance.users[1];

        const response = await request(userManagerInstance.deleteUser).delete(`/api/users/${userToFind.id}`);

        expect(response.status).toBe(204);
    });

    it('should return 404 for missing ID', async () => {
        const userManagerInstance = new UserManager();

        const response = await request(userManagerInstance.deleteUser).delete(`/api/users/4771182c-af46-40bb-b652-2208cfbc37ff`);

        expect(response.status).toBe(404);
    });

    it('should return 400 for invalid ID', async () => {
        const userManagerInstance = new UserManager();

        const response = await request(userManagerInstance.deleteUser).delete(`/api/users/1`);

        expect(response.status).toBe(400);
    });
});
