const SequelizeMock = require('sequelize-mock');

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

describe('User Model', () => {
    it('should create a user', async () => {
        const user = await UserMock.create({
            fullname: 'Test User',
            email: 'testuser@example.com',
            username: 'testuser',
            password: 'password123',
            profile: 'profile.jpg',
        });

        expect(user.fullname).toBe('Test User');
        expect(user.email).toBe('testuser@example.com');
        expect(user.username).toBe('testuser');
        expect(user.password).toBe('password123');
        expect(user.profile).toBe('profile.jpg');
    });
});