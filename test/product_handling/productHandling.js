const mysql = require("mysql2");

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "myapp",
});
// Set up storage for images
module.exports.get_id_of_catagary = (catagary_name) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT id FROM catagary WHERE cat_name = ?";
        database.query(query, [catagary_name], (err, result) => {
            if (err) {
                reject(err);
            } else if (result.length === 0) {
                return null;
            } else {
                resolve(result[0].id);
            }
        });
    });
};

module.exports.add_product = (id, name, descripation, catagary_id) => {
    const query =
        "INSERT INTO products(pd_name,description,catagary_id,createdby) VALUES (?,?,?,?)";
    database.query(
        query,
        [name, descripation, catagary_id, id],
        (err, resulat) => {
            if (err) {
                console.log("error in email user", err);
                throw err;
            } else {
                console.log("added succ.", resulat);
                return;
            }
        }
    );
};
module.exports.update_product_name = (id, name) => {
    const query = "UPDATE products SET pd_name = ? WHERE id=?";
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
module.exports.update_product_description = (id, description) => {
    const query = "UPDATE products SET description = ? WHERE id=?";
    database.query(query, [description, id], (err, resulat) => {
        if (err) {
            console.log("error in email user", err);
            throw err;
        } else {
            console.log("added succ.");
            return;
        }
    });
};
module.exports.update_product_catagary_id = (id, catagary_id) => {
    const query = "UPDATE products SET catagary_id = ? WHERE id=?";
    database.query(query, [catagary_id, id], (err, resulat) => {
        if (err) {
            console.log("error in email user", err);
            throw err;
        } else {
            console.log("added succ.");
            return;
        }
    });
};
module.exports.addImage = async (name, image_path) => {
    const query = "UPDATE products SET image_path = ? WHERE pd_name = ?";
    database.query(query, [image_path, name], (err, resulat) => {
        if (err) {
            console.log("error in email user", err);
            throw err;
        } else {
            console.log("image_path save succ :)");
            console.log(query);
            console.log(image_path);
            return;
        }
    });
};
module.exports.addImage_by_id = async (id, image_path) => {
    const query = "UPDATE products SET image_path = ? WHERE id = ?";
    database.query(query, [image_path, id], (err, resulat) => {
        if (err) {
            console.log("error in email user", err);
            throw err;
        } else {
            console.log("image_path save succ :)");
            console.log(query);
            console.log(image_path);
            return;
        }
    });
};
module.exports.get_product_by_name = (name) => {
    const query = "SELECT * FROM products WHERE pd_name LIKE ?";
    const params = [`%${name}%`];
    return new Promise((resolve, reject) => {
        database.query(query, [params], (err, resulat) => {
            if (err) {
                reject(err);
            } else if (resulat.length === 0) {
                resolve(null);
            } else {
                resolve(resulat);
            }
        });
    });
};
module.exports.get_product_by_id = (id) => {
    const query = "SELECT * FROM products WHERE id=?";
    return new Promise((resolve, reject) => {
        database.query(query, [id], (err, resulat) => {
            if (err) {
                reject(err);
            } else if (resulat.length === 0) {
                resolve(null);
            } else {
                resolve(resulat[0]);
            }
        });
    });
};
module.exports.delet_product = (id) => {
    const query = "DELETE  FROM products WHERE id = ?";
    database.query(query, [id], (err, resulat) => {
        if (err) {
            console.log("error in email user", err);
            throw err;
        } else {
            return;
        }
    });
};
module.exports.get_product_by_catagary_id = (id) => {
    const query = "SELECT * FROM products WHERE catagary_id = ?";
    return new Promise((resolve, reject) => {
        database.query(query, [id], (err, resulat) => {
            if (err) {
                reject(err);
            } else if (resulat.length === 0) {
                resolve(null);
            } else {
                resolve(resulat);
            }
        });
    });
};
module.exports.get_products = () => {
    const query =
        "SELECT products.pd_name, products.description, products.image_path, products.catagary_id, catagary.cat_name FROM products INNER JOIN catagary ON products.catagary_id = catagary.id ";
    return new Promise((resolve, reject) => {
        database.query(query, (err, resulat) => {
            if (err) {
                console.log(err);
                reject(err);
            } else if (resulat.length === 0) {
                resolve(null);
            } else {
                resolve(resulat);
            }
        });
    });
};
