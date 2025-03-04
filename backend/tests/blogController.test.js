import SequelizeMock from 'sequelize-mock';
import blogController from '../controller/blog.controller.js';

// Setup the mock database connection
const DBConnectionMock = new SequelizeMock();

// Mock the User model
const UserMock = DBConnectionMock.define('User', {
    id: 1,
    full_name: 'Test User',
    email: 'testuser@example.com',
    username: 'testuser',
    password: 'password123',
});

// Mock the Blog model
const BlogMock = DBConnectionMock.define('Blog', {
    id: 1,
    title: 'Test Blog',
    photos: 'test.jpg',
    description: 'This is a test blog',
    shares_count: 10,
    user_id: 1,
    categories_id: 1,
    location_id: 1,
    address: '123 Test St',
    open_time: '09:00:00',
    close_time: '17:00:00',
});

// Define associations
BlogMock.belongsTo(UserMock, { foreignKey: 'user_id' });

// Mock the request and response objects
const mockRequest = (body = {}, params = {}, file = null) => ({
    body,
    params,
    file,
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

describe('blogController', () => {
    it('should create a blog', async () => {
        const req = mockRequest({
            title: 'Test Blog',
            desc: 'This is a test blog',
            location_id: 1,
            user_id: 1,
            categories_id: 1,
            address: '123 Test St',
            open_time: '09:00:00',
            close_time: '17:00:00',
        }, {}, { path: 'test.jpg' });
        const res = mockResponse();

        await blogController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Test Blog',
            photos: 'test.jpg',
            description: 'This is a test blog',
            location_id: 1,
            user_id: 1,
            categories_id: 1,
            address: '123 Test St',
            open_time: '09:00:00',
            close_time: '17:00:00',
        }));
    });

    it('should update a blog', async () => {
        const req = mockRequest({
            title: 'Updated Blog',
            photo: 'updated.jpg',
            desc: 'This is an updated blog',
            location: 1,
            user_id: 1,
            categories_id: 1,
            address: '123 Updated St',
            open_time: '10:00:00',
            close_time: '18:00:00',
        }, { id: 1 });
        const res = mockResponse();

        await blogController.update(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Updated Blog',
            photos: 'updated.jpg',
            description: 'This is an updated blog',
            location_id: 1,
            user_id: 1,
            categories_id: 1,
            address: '123 Updated St',
            open_time: '10:00:00',
            close_time: '18:00:00',
        }));
    });

    it('should delete a blog', async () => {
        const req = mockRequest({}, { id: 1 });
        const res = mockResponse();

        await blogController.delete(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Blog deleted successfully',
        }));
    });

    it('should get all blogs', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await blogController.getAllBlogs(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });

    it('should get a blog by ID', async () => {
        const req = mockRequest({}, { id: 1 });
        const res = mockResponse();

        await blogController.getBlogsById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Test Blog',
            photos: 'test.jpg',
            description: 'This is a test blog',
            location_id: 1,
            user_id: 1,
            categories_id: 1,
            address: '123 Test St',
            open_time: '09:00:00',
            close_time: '17:00:00',
        }));
    });
});