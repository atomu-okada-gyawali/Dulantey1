import request from 'supertest';
import express from 'express';
import blogRoutes from '../routes/blogs.routes.js';
import Blog from '../model/blog.model.js';

const app = express();
app.use(express.json());
app.use('/blogs', blogRoutes);

jest.mock('../model/blog.model.js');

describe('Blog Routes', () => {
    it('should create a new blog', async () => {
        const newBlog = {
            title: 'Test Blog',
            desc: 'This is a test blog',
            location_id: 1,
            user_id: 1,
            categories_id: 1,
            address: '123 Test St',
            open_time: '09:00:00',
            close_time: '17:00:00',
            photo: 'test.jpg',
        };

        Blog.create.mockResolvedValue(newBlog);

        const response = await request(app)
            .post('/blogs/createBlog')
            .send(newBlog);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining(newBlog));
    });

    it('should get all blogs', async () => {
        const blogs = [
            {
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
            },
        ];

        Blog.findAll.mockResolvedValue(blogs);

        const response = await request(app).get('/blogs/getAllBlogs');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(blogs);
    });

    it('should get a blog by ID', async () => {
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

        Blog.findByPk.mockResolvedValue(blog);

        const response = await request(app).get('/blogs/getBlogById/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(blog);
    });

    it('should update a blog', async () => {
        const updatedBlog = {
            title: 'Updated Blog',
            photo: 'updated.jpg',
            desc: 'This is an updated blog',
            location: 1,
            user_id: 1,
            categories_id: 1,
            address: '123 Updated St',
            open_time: '10:00:00',
            close_time: '18:00:00',
        };

        Blog.update.mockResolvedValue([1]);

        const response = await request(app)
            .put('/blogs/updateBlog/1')
            .send(updatedBlog);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: 'Blog updated successfully',
        });
    });

    it('should delete a blog', async () => {
        Blog.destroy.mockResolvedValue(1);

        const response = await request(app).delete('/blogs/deleteBlog/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Blog deleted successfully' });
    });
});