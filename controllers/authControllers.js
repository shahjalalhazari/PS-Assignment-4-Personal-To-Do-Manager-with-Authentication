const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { saveUserData, checkUser } = require("../utils/authLogger");


// USER SIGNUP CONTROLLER FUNCTION
const signupUserController = async (req, res) => {
    // GET THE USERNAME & PASSWORD FROM REQUEST BODY THEN VALIDATE THEM.
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).send("Username and password are required.");
    }
    // CONVERT THE PASSWORD TO HASHED PASSWORD, CREATE USER OBJECT.
    const passwordHash = await bcrypt.hash(password, 12);
    const newUserData = {
        id: Date.now().toString(), // USING CURRENT TIMESTAMP AS A UNIQUE ID FOR THE USER.
        username,
        password: passwordHash
    }

    // SAVE THE USER DATA TO THE FILE.
    const result = saveUserData(newUserData);
    if (!result.success) {
        return res.status(409).send(result.message);
    }
    res.status(200).send(result.message); 
};


// USER SIGNIN CONTROLLER FUNCTION
const signinUserController = async(req, res) => {
    // GET THE USERNAME & PASSWORD FROM REQUEST BODY THEN VALIDATE THEM.
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).send("Username and password are required.");
    }
    // CHECK THE USER EXISTS OR NOT.
    const user = checkUser(username);
    if (!user) return res.status(401).json({message: "user not found!"});

    // PASSWORD VALIDATION
    const validPassword =   await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({message: "Password doesn't match.!"});

    const payload = {
        userId: user.id,
        username: user.username
    };
    // GENERATE A JWT TOKEN FOR THE USER.
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(200).json({ message: "Signin successful.", token });
};


module.exports = {
    signupUserController,
    signinUserController
}