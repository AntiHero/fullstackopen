const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
//const helper = require('./test-helper');

const api = supertest(app);

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('define if blogs have property id', async () => {
  const response = await api.get('/api/blogs');
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined();
  });
});

describe('post new blog', () => {
  test('a valid blog can be added ', async () => {
    let response = await api.get('/api/blogs');
    const notesNumBeforePost = response.body.length;

    const newBlog = {
      title: 'new blog',
      author: 'R. Higgins',
      url: 'new url',
      likes: `${Math.floor(Math.random() * 20)}`,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    response = await api.get('/api/blogs');
    const notesNumAfterPost = response.body.length;

    expect(notesNumAfterPost).toBe(notesNumBeforePost + 1);

    const contents = response.body.map(b => b.title);
    expect(contents).toContain('new blog');
  });
});

describe('posting blog with no likes', () => {
  test('blog with not like filed has 0 likes by default', async () => {
    const blog = new Blog({
      title: 'Forest tails',
      author: 'N. Nicolson',
      url: 'https://forest-tails.com/blog/1.html',
    });

    const result = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201);

    const id = result.body.id;

    const response = await api.get('/api/blogs');
    const lastBlog = response.body.filter(blog => blog.id === id)[0];

    expect(lastBlog.likes).toBe(0);
  });
});

describe('posting blog with no title or url', () => {
  test('posting a blog with not title or url get 400 Bad request response status ', async () => {
    const blogWithoutTitle = new Blog({
      author: 'N. Nicolson',
      url: 'https://forest-tails.com/blog/2.html',
      likes: 10,
    });

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400);

    const blogWithoutURL = new Blog({
      title: 'Fable',
      author: 'N. Nicolson',
      likes: 10,
    });

    await api
      .post('/api/blogs')
      .send(blogWithoutURL)
      .expect(400);
  });
});

describe('deleting a blog', () => {
  test('succeeds with status code 204 if blog is deleted', async () => {
    let blogs = await api.get('/api/blogs');

    if (blogs.body.length !== 0) {
      const blogToDelete = blogs.body[0];
      const blogsNumBeforeDelete = blogs.body.length;

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      blogs = await api.get('/api/blogs');

      const blogNumAfterDelete = blogs.body.length;

      expect(blogNumAfterDelete).toBe(blogsNumBeforeDelete - 1);
    } else {
      expect(blogs.body.length).toBe(0);
    }
  });
});

describe('updating a blog', () => {
  test('success with status code 200 and new title if blog is updated', async () => {
    let blogs = await api.get('/api/blogs');

    if (blogs.body.length !== 0) {
      const blogToUpdate = blogs.body[0];

      const updatedBlog = new Blog({
        ...blogToUpdate,
        title: 'Updated Blog',
      });

      await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200);

      blogs = await api.get('/api/blogs');

      const titles = blogs.body.map(b => b.title);
      expect(titles).toContain(updatedBlog.title);
    } else {
      expect(blogs.body.length).toBe(0);
    }
  });
});

afterAll(() => {
  mongoose.connection.close();
});
