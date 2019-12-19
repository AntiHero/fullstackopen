const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;

    const saltRounds = 10;

    if (!body.password || body.password.length < 3) {
      let error = new Error('Password Error');
      error.name = 'PasswordError';
      throw error;
    }

    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
  response.json(users.map(u => u.toJSON()));
});

module.exports = usersRouter;
