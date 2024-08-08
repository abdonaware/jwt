const jwt = require("jsonwebtoken");
const checkUserEmail = require("../user/model").get_user_id;

module.exports.adminAuth = async (req, res, next) => {
    // check json web token exists & is verified
    console.log("fuction called");

    const token = req.header("Authorization");
    console.log(token);
    if (token) {
        let decoded = jwt.verify(
            token,
            "secreat key ",
            async (err, decodedToken) => {
                console.log(decodedToken);
                if (!err && decodedToken.userTypeId === 1) {
                    let resualt = await checkUserEmail(decodedToken.id);
                    console.log(resualt);
                    if (decodedToken.email === resualt.email) {
                        next();
                    } else {
                        res.status(401).send("login again");
                    }
                } else if (!err) {
                    res.send("sorry your not an admin");
                } else {
                    console.log(err.message);
                    res.status(401).send("not Authorization");
                }
            }
        );
    } else {
        res.status(401).send("not Authorization");
    }
};

// check current user
