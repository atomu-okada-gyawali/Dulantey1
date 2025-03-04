import SequelizeMock from 'sequelize-mock';
import bcrypt from 'bcrypt';
import UserController from '../controller/user.controller.js';

// Setup the mock database connection
const DBConnectionMock = new SequelizeMock();

// Mock the User model
const UserMock = DBConnectionMock.define('User', {
    id: 1,
    fullname: 'Test User',
    email: 'testuser@example.com',
    username: 'testuser',
    password: 'password123',
    profile: 'profile.jpg',
});

// Mock bcrypt hash function
jest.mock('bcrypt', () => ({
    hash: jest.fn((password, saltRounds) => Promise.resolve(`hashed_${password}`)),
}));

// Mock the request and response objects
const mockRequest = (body = {}, params = {}) => ({
    body,
    params,
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

describe('UserController', () => {
    it('should register a user', async () => {
        const req = mockRequest({
            fullname: 'Test User',
            email: 'testuser@example.com',
            username: 'testuser',
            password: 'password123',
        });
        const res = mockResponse();

        UserMock.create.mockResolvedValue(req.body);

        await UserController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            fullname: 'Test User',
            email: 'testuser@example.com',
            username: 'testuser',
        }));
    });

    it('should get a user by ID', async () => {
        const req = mockRequest({}, { id: 1 });
        const res = mockResponse();

        const user = {
            id: 1,
            fullname: 'Test User',
            email: 'testuser@example.com',
            username: 'testuser',
            password: 'password123',
            profile: 'profile.jpg',
        };
        UserMock.findOne.mockResolvedValue(user);

        await UserController.getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(user);
    });

    it('should update a user', async () => {
        const req = mockRequest({
            fullname: 'Updated User',
            email: 'updated@example.com',
            username: 'updateduser',
            password: 'newpassword123',
        }, { id: 1 });
        const res = mockResponse();

        UserMock.update.mockResolvedValue([1]);
        UserMock.findOne.mockResolvedValue(req.body);

        await UserController.updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining([1]));
    });

    it('should delete a user', async () => {
        const req = mockRequest({}, { id: 1 });
        const res = mockResponse();

        UserMock.destroy.mockResolvedValue(1);

        await UserController.deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining(1));
    });
});