const express = require("express");
const router = express.Router();

const { addTodoController, getTodoOfUserController } = require("../controllers/todoControllers");


// GET ALL TO-DOS
router.get("/", getTodoOfUserController);


// ADD NEW TO-DO
router.post("/add-todo", addTodoController);


module.exports = router;