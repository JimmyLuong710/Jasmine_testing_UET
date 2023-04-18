const express = require("express");
const userRouter = express.Router();

const users = [
  {
    id: 1,
    name: "Vinh",
    email: "vinh@gmail.com",
  },
  {
    id: 2,
    name: "Quang Anh",
    email: "quanganh@gmail.com",
  },
  {
    id: 3,
    name: "Son",
    email: "sonh@gmail.com",
  },
  {
    id: 4,
    name: "Truong",
    email: "truong@gmail.com",
  },
];

userRouter.get("/users", (req, res) => {
  res.json(users);
});

userRouter.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const userFound = users.find((user) => user.id == userId);
  if (!userFound) return res.status(404).json("User not found");

  res.json(userFound);
});

userRouter.post("/users", (req, res) => {
  const userDto = req.body;
  const existedUser = users.find((user) => user.id == userDto.id);
  if (existedUser) return res.status(400).json("User already exists");

  // add new user to database (fake)
  users.push(userDto);
  res.status(201).json(userDto);
});

module.exports = userRouter;
