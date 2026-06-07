const express = require("express");
const router = express.Router();

const { addTodoController } = require("../controllers/todoControllers");


// GET ALL TO-DOS
router.get("/", (req, res) => {
    res.json({ message: "Get todo list."})
})


// ADD NEW TO-DO
router.post("/add-todo", addTodoController)

module.exports = router;