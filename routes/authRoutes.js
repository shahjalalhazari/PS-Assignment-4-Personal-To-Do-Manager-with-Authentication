const express = require("express");
const router = express.Router();

const { signupUserController, signinUserController, getUserProfile } = require("../controllers/authControllers");

// AUTH MIDDLEWARE
const authMiddleware = require("../middleware/authMiddleware");


// USER PROFILE ROUTE
router.get("/profile", authMiddleware, getUserProfile)


// SIGNUP ROUTE
router.post("/signup", signupUserController);

// SIGNIN ROUTE
router.post("/signin", signinUserController);

module.exports = router;