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
const signinUserController = (req, res) => {
    // GET THE USERNAME & PASSWORD FROM REQUEST BODY THEN VALIDATE THEM.
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).send("Username and password are required.");
    }
    // CHECK THE USER EXISTS OR NOT.
    const user = checkUser(username);
    if (user) {
        // IF USER EXISTS THEN COMPARE THE PASSWORD.
        bcrypt.compare(password, user.password, (err, isMatch) => {
            // IF ANY ERROR WHILE COMPARING.
            if (err) {
                return res.status(500).send("Password doesn't match.");
            }
            // IF PASSWORD MATCH SUCCESSFULLY THEN GENERATE A JWT TOKEN AND SEND TO THE USER.
            if (isMatch) {
                // SET USERNAME & USER ID TO TOKEN AS PAYLOAD.
                const payload = {
                    userId: user.id,
                    username: user.username
                };
                // GENERATE A JWT TOKEN FOR THE USER.
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
                res.status(200).send({ message: "Signin successful.", token });
            } else {
                res.status(401).send("Invalid username or password.");
            }
        });
    } else {
        res.status(404).send("User not found.");
    }
};


module.exports = {
    signupUserController,
    signinUserController
}