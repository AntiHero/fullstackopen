const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

describe('create new user', () => {
  test('if username length is less than 3 characters there will be an error with 400 status code and proper error message', async () => {
    const user = {
      username: 'ma',
      name: 'Maurisio Rua',
      password: '123',
    };

    let result = await api
      .post('/api/users')
      .send(user)
      .expect(400);

    expect(result.body.error).toBe(`User validation failed: username: Path \`username\` (\`${user.username}\`) is shorter than the minimum allowed length (3).`);
  });

  test('if password length is less than 3 characters there will be an error with 400 status code and proper error message', async () => {
    const user = {
      username: 'maurisio',
      name: 'Maurisio Rua',
      password: '12',
    };

    let result = await api
      .post('/api/users')
      .send(user)
      .expect(400);

    expect(result.body.error).toBe(
      'password should be at least 3 characters long'
    );
  });

  test('if username is not unique validation error will be recieved', async () => {
    let users = await api.get('/api/users');
    let user = {};

    if (!users.body.length) {
      user = {
        username: 'maurisio',
        name: 'Maurisio Rua',
        password: '123',
      };

      await api
        .post('/api/users')
        .send(user)
        .expect(201);
    } else {
      user = {
        username: users.body[0].username,
        name: users.body[0].name,
        password: '123',
      };
    }

    let result = await api
      .post('/api/users')
      .send(user)
      .expect(400);

    expect(result.body.error).toContain(`User validation failed: username: Error, expected \`username\` to be unique. Value: \`${user.username}\``);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
