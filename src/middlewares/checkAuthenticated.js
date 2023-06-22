const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodeToken) => {
            if (err) {
                console.log(`Error ${err.message} Occured On Token Recognize`);
                res.redirect("/login")
            }
            res.redirect("/");
        })
    }
    else {
        next()
    }
}