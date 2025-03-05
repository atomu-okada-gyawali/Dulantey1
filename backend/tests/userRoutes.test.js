import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/user.routes.js';
import User from '../model/user.model.js';

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

jest.mock('../model/user.model.js');

describe('User Routes', () => {
    it('should register a new user', async () => {
        const newUser = {
            fullname: 'Test User',
            email: 'testuser@example.com',
            username: 'testuser',
            password: 'password123',
        };

        User.create.mockResolvedValue(newUser);

        const response = await request(app)
            .post('/users/registration')
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining(newUser));
    });

    it('should get a user by ID', async () => {
        const user = {
            id: 1,
            fullname: 'Test User',
            email: 'testuser@example.com',
            username: 'testuser',
            password: 'password123',
            profile: 'profile.jpg',
        };

        User.findByPk.mockResolvedValue(user);

        const response = await request(app).get('/users/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(user);
    });

    it('should update a user', async () => {
        const updatedUser = {
            fullname: 'Updated User',
            email: 'updated@example.com',
            username: 'updateduser',
            password: 'newpassword123',
        };

        User.update.mockResolvedValue([1]);

        const response = await request(app)
            .put('/users/1')
            .send(updatedUser);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            message: 'User updated successfully',
        });
    });

    it('should delete a user', async () => {
        User.destroy.mockResolvedValue(1);

        const response = await request(app).delete('/users/1');

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'User deleted successfully' });
    });
});