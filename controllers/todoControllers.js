const jwt = require("jsonwebtoken");
const { saveNewTodo } = require("../utils/todoLogger");

const addTodoController = (req, res) => {
    // GET THE TODO TEXT REQUEST BODY AND VALIDATE IT
    const { text } = req.body;
    if (!text) return res.status(400).send("Text field is required!")

    // GETTING TOKEN FROM HEADER AND CONCIDER USER AS AUTHENTICATED.
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message:"No token provided" });
    }

    // VERIFY & DECODE USER FROM THE TOKEN
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // TOKEN VALIDATION & GET THE USER FROM TOKEN
        if (err) return res.status(401).json({ message: "Invalid token" });
        const user = decoded;

        // CREATE OBJECT OF NEW TODO DATA
        const newTodo = {
            id: Date.now().toString(),
            userId: user.userId,
            text: text,
            createdAt: new Date().toISOString()
        };

        // SAVE THE TODO DATA TO THE FILE.
        const result = saveNewTodo(newTodo);
        if (result.success) {
            return res.status(200).send(result.message);
        }
        res.status(409).send("Something went wrong while adding todo"); 
    })
}

module.exports = {
    addTodoController
}