const bcrypt = require("bcrypt");
const { saveUserData } = require("../utils/logger");

const signupUserController = async (req, res) => {
    // GET THE USERNAME & PASSWORD FROM REQUEST BODY THEN VALIDATE THEM.
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).send("Username and password are required.");
    }
    // CONVERT THE PASSWORD TO HASHED PASSWORD, CREATE USER OBJECT.
    const passwordHash = await bcrypt.hash(password, 12);
    const newUserData = {
        id: Date.now().toString(),
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


module.exports = {
    signupUserController
}