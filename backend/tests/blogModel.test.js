const SequelizeMock = require('sequelize-mock');

// Setup the mock database connection
const DBConnectionMock = new SequelizeMock();

// Mock the User, Category, and Location models
const UserMock = DBConnectionMock.define('User', {
    id: 1,
    full_name: 'Test User',
    email: 'testuser@example.com',
    username: 'testuser',
    password: 'password123',
});

const CategoryMock = DBConnectionMock.define('Category', {
    id: 1,
    name: 'Test Category',
});

const LocationMock = DBConnectionMock.define('Location', {
    id: 1,
    name: 'Test Location',
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
BlogMock.belongsTo(CategoryMock, { foreignKey: 'categories_id' });
BlogMock.belongsTo(LocationMock, { foreignKey: 'location_id' });

describe('Blog Model', () => {
    it('should create a blog', async () => {
        const blog = await BlogMock.create({
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

        expect(blog.title).toBe('Test Blog');
        expect(blog.photos).toBe('test.jpg');
        expect(blog.description).toBe('This is a test blog');
        expect(blog.shares_count).toBe(10);
        expect(blog.user_id).toBe(1);
        expect(blog.categories_id).toBe(1);
        expect(blog.location_id).toBe(1);
        expect(blog.address).toBe('123 Test St');
        expect(blog.open_time).toBe('09:00:00');
        expect(blog.close_time).toBe('17:00:00');
    });
});