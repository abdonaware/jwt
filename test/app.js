const fs = require("fs");
const joi = require("joi");
const path = require("path");
const mysql = require("mysql2");
const crypto = require("crypto");
const express = require("express");
const routes = require("./Routes/productRoutes");
const middlewareAuth = require("./middleware/middlewareAuth").adminAuth;
const cookieparser = require("cookie-parser");
/////////////////////////middleware
const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(express.static("public"));

// view engine
app.set("view engine", "ejs");

// database connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "myapp",
});

// Open the MySQL connection
connection.connect((error) => {
    if (error) {
        console.error("Error connecting to the database:", error);
        return;
    }
    console.log("Successfully connected to the database.");
});
app.get("/", (req, res) => {
    res.send("jkdjkhdkjdkjkd");
});
app.use(routes);
app.listen(3000, (error) => {
    if (!error) {
        console.log("server start at port : 3000 ,,,,GOOD LUCK :)");
    } else {
        console.log("ERROR IN SERVER");
    }
});
