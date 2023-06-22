const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(`Error ${err} Occured On Token Recognize`);
                res.redirect("/login");
            } else {
                next()
            }
        })
    }
    else {
        console.log("Not Authorized Or Token Expired");
        res.redirect("/login");
    }
}