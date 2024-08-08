const fun = require("../user/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const tokenCreation = (id, email, userTypeId) => {
    return jwt.sign({ id, email, userTypeId }, "secreat key ");
};
module.exports.signup_post = async (req, res) => {
    let { email, password, userTypeId } = req.body;
    password = await bcrypt.hash(password, 12);
    fun.add_user(email, password, userTypeId, (err, resulat) => {
        if (err) {
            res.status(400).json({ errors });
        }
        try {
            console.log("creation succ.");
            const token = tokenCreation(resulat.insertId, email, userTypeId);
            res.header("Authorization", token);
            res.status(201).json({ email });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    });
};
module.exports.login_post = async (req, res) => {
    let { email, password } = req.body;
    fun.get_user(email, (err, resulat) => {
        try {
            if (bcrypt.compare(password, resulat.password)) {
                console.log("loged in");
                const token = tokenCreation(
                    resulat.id,
                    email,
                    resulat.userTypeId
                );
                res.cookie("jwt", token, { httpOnly: true });
                res.status(201).json({ email });
            } else {
                res.send("the  password is wrong please try again");
            }
        } catch (err) {
            res.send("no user found");
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    });
};
module.exports.logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/login");
};
