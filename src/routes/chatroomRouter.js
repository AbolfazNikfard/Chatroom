const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
const checkNotAuthenticated = require("../middlewares/checkNotAuthenticated");
const chatroomController = require("../controllers/chatroomController");

router.get("/", checkNotAuthenticated, async (req, res) => {
    try {
        const token = req.cookies.jwt
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (_, decodedToken) => {
            const thisUser = await userModel.findById(decodedToken.id);
            res.render("chatroom.ejs", { user: thisUser });
        })
    }
    catch (err) {
        console.log("Catched Error : " + err.message);
        res.status(500).send({
            status: 500,
            error: "Internal Server"
        });
    }
});
router.get("/getchatroomMessages/:roomId", checkNotAuthenticated, chatroomController.getmessages);
router.get("/getRooms", checkNotAuthenticated, chatroomController.getRooms);

router.post("/sendMessage", checkNotAuthenticated, chatroomController.sendMessage);
module.exports = router;