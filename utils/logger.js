const fs = require("fs");
const path = require("path");

// USER DATA FILE PATH AND FUNCTION TO SAVE USER DATA TO THE FILE.
const usersFilePath = path.join(__dirname, "../assets/users.json");
const saveUserData = (userData) => {
    let data = [];

    if (fs.existsSync(usersFilePath)) {
        const raw = fs.readFileSync(usersFilePath);
        data = JSON.parse(raw);
    }
    data.push(userData);
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
};


module.exports = {
    saveUserData
}