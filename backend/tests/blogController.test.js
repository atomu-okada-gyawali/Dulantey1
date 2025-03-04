import { create, update, delete as deleteBlog, getAllBlogs, getBlogsById } from '../controller/blog.controller.js';
import Blog from '../model/blog.model.js';

// Mock the Blog model methods
jest.mock('../model/blog.model.js', () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
}));

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

        Blog.create.mockResolvedValue(req.body);

        await create(req, res);

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

        Blog.update.mockResolvedValue([1]);
        Blog.findOne.mockResolvedValue(req.body);

        await update(req, res);

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

        Blog.destroy.mockResolvedValue(1);

        await deleteBlog(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Blog deleted successfully' });
    });

    it('should get all blogs', async () => {
        const req = mockRequest();
        const res = mockResponse();

        const blogs = [{
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
        }];
        Blog.findAll.mockResolvedValue(blogs);

        await getAllBlogs(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(blogs);
    });

    it('should get a blog by ID', async () => {
        const req = mockRequest({}, { id: 1 });
        const res = mockResponse();

        const blog = {
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
        };
        Blog.findOne.mockResolvedValue(blog);

        await getBlogsById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(blog);
    });
});