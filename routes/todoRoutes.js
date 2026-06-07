const express = require("express");
const router = express.Router();

const { addTodoController, getTodoOfUser } = require("../controllers/todoControllers");

// MIDDLEWARE
const authMiddleware = require("../middleware/authMiddleware");


// GET ALL TO-DOS
router.get("/", authMiddleware, getTodoOfUser);


// ADD NEW TO-DO
router.post("/add-todo", authMiddleware, addTodoController);


module.exports = router;