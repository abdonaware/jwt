const mysql = require("mysql2");
const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "myapp",
});

module.exports.add_catagary = (id, name, descripation) => {
    const query =
        "INSERT INTO catagary(cat_name,cat_description,createdby) VALUES (?,?,?)";

    database.query(query, [name, descripation, id], (err, resulat) => {
        if (err) {
            console.log("error in email user", err);
            throw err;
        } else {
            console.log("added succ.");
            return resulat;
        }
    });
};

module.exports.delet_catagary = (id) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM catagary WHERE id = ?";
        database.query(query, [id], (err, result) => {
            if (err) {
                reject(err.message); // Reject with the error message
            } else {
                resolve(result); // Resolve with the result
            }
        });
    });
};

module.exports.update_catagary_name = (id, name) => {
    const query = "UPDATE catagary SET cat_name = ? WHERE id=?";
    database.query(query, [name, id], (err, resulat) => {
        if (err) {
            console.log("error in email user", err);
            throw err;
        } else {
            console.log("added succ.");
            return;
        }
    });
};
module.exports.update_catagary_descripation = (id, descripation) => {
    const query = "UPDATE catagary SET cat_description = ? WHERE id=?";
    database.query(query, [descripation, id], (err, resulat) => {
        if (err) {
            console.log("error in email user", err);
            throw err;
        } else {
            console.log("added succ.");
            return;
        }
    });
};
