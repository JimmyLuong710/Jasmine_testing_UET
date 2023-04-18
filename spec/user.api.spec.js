const request = require("request");

describe("RESTful API Test with user route", function () {
  const App = require("../src/server");
  const server = new App();

  beforeAll(function () {
    server.start();
  });
  afterAll(function () {
    server.shutdown();
  });

  describe("GET /users", function () {
    it("should return a list of users", function (done) {
      request.get("http://localhost:3000/users", function (err, res, body) {
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(body).length).toBeGreaterThan(0);
        done();
      });
    });

    it("should return user with valid userId: 1", function (done) {
      request.get("http://localhost:3000/users/1", function (err, res, body) {
        const user = JSON.parse(body);
        expect(res.statusCode).toBe(200);
        expect(parseInt(user.id)).toBe(1);
        expect(user.name).toBe("Vinh");
        expect(user.email).toBe("vinh@gmail.com");
        done();
      });
    });

    it("should return 404 for invalid userIds: -1 and 999", function (done) {
      request.get("http://localhost:3000/users/999", function (err, res, body) {
        expect(res.statusCode).toBe(404);
        done();
      });

      request.get("http://localhost:3000/users/-1", function (err, res, body) {
        expect(res.statusCode).toBe(404);
        done();
      });
    });
  });

  describe("POST /users", function () {
    it("should create a new user", function (done) {
      const newUser = {
        id: 5,
        name: "Jane",
        email: "jane@example.com",
      };
      request.post(
        {
          url: "http://localhost:3000/users",
          body: newUser,
          json: true,
        },
        function (err, res, body) {
          expect(res.statusCode).toBe(201);
          expect(body.id).toBeDefined();
          expect(body.name).toBe("Jane");
          expect(body.email).toBe("jane@example.com");
          done();
        }
      );
    });
  });
});
