const mysql = require("mysql2");
const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "myapp",
});

const add_user = (email, password, userTypeId, callback) => {
    const query = "INSERT INTO users(email,password,userTypeId) VALUES (?,?,?)";
    database.query(query, [email, password, userTypeId], (err, resulat) => {
        if (err) {
            console.log("error in adding user", err);
        } else {
            return callback(null, resulat);
        }
    });
};
const get_user = (email, callback) => {
    const query = "SELECT * FROM users WHERE email= ?";
    database.query(query, [email], (err, resulat) => {
        if (err) {
            console.log("error in email user", err);
            return callback(true, null);
        } else {
            return callback(null, resulat[0]);
        }
    });
};
const get_user_id = async (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE id= ?";
        database.query(query, [id], (err, resulat) => {
            if (err) {
                console.log("error in email user", err);
                reject();
            } else {
                console.log(resulat);
                resolve(resulat[0]);
            }
        });
    });
};
module.exports = {
    add_user,
    get_user,
    get_user_id,
};
