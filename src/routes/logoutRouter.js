const express = require("express")
const router = express.Router();
router.get("/", (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        res.clearCookie("jwt");
        console.log("Token Expired After Logout");
    }
    else {
        console.log("You not authenticated")
    }
    res.redirect("/login");
})
module.exports = router;