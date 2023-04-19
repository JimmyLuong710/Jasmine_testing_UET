const request = require('request');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');

const MONGODB_URL = "mongodb://localhost:27017/jasmine_testing"

describe('Test user API', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(4000, () => {
      mongoose.connect(process.env.MONGODB_URL);
      done();
    });
  });

  afterAll((done) => {
    mongoose.connection.close();
    server.close(done);
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('Create a new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    const options = {
      method: 'POST',
      uri: 'http://localhost:4000/users',
      body: newUser,
      json: true,
    };

    request(options, async (error, response, body) => {
      expect(response.statusCode).toBe(201);
      expect(body.name).toBe(newUser.name);
      expect(body.email).toBe(newUser.email);

      const user = await User.findOne({ email: newUser.email });

      expect(user).toBeDefined();
      expect(user.name).toBe(newUser.name);
      expect(user.email).toBe(newUser.email);
    });
  });
});
