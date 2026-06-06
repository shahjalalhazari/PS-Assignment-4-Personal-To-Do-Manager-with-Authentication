const express = require("express");
const router = express.Router();

const { signupUserController } = require("../controllers/authControllers");


// SIGNUP ROUTE
router.post("/signup", signupUserController);

module.exports = router;