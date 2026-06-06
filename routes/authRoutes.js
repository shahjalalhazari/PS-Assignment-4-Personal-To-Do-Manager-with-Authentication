const express = require("express");
const router = express.Router();

const { signupUserController, signinUserController } = require("../controllers/authControllers");


// SIGNUP ROUTE
router.post("/signup", signupUserController);

// SIGNIN ROUTE
router.post("/signin", signinUserController);

module.exports = router;