const request = require("request");
const mongoose = require("mongoose");
const Task = require("../src/models/task.model");

const MONGODB_URL = "mongodb://localhost:27017/jasmine_testing";
const BACKEND_URL = "http://localhost:3000";

describe("Test task API", () => {
  const App = require("../src/server");
  const server = new App();

  beforeAll(async () => {
    server.start();
    await mongoose.connect(MONGODB_URL);
  });

  afterAll(() => {
    mongoose.connection.close();
    server.shutdown();
  });

  beforeEach(async () => {
    await Task.deleteMany({});
  });

  it("Create a new task", function (done) {
    const newTask = {
      title: "Deadline testing with tool jasmine",
      description: "This is the first test",
    };

    const options = {
      uri: `${BACKEND_URL}/tasks`,
      body: newTask,
      json: true,
    };
    request.post(options, async (err, res, body) => {
      const task = await Task.findOne({ title: newTask.title });

      expect(task).toBeDefined();
      expect(task.title).toBe(newTask.title);
      expect(task.description).toBe(newTask.description);
      done();
    });
  });
});
