const express = require("express");
const { registerUser } = require("../controllers/user.contoller");

const userRouter = express.Router();

userRouter.post("/register", registerUser);

module.exports = userRouter;
