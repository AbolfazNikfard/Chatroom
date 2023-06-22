const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
const roomModel = require("../models/rooms");
const messageModel = require("../models/messages");
const getThisUserChatrooms = require("../dist/getUserChatroomPage");
const checkNotAuthenticated = require("../middlewares/checkNotAuthenticated");
const addContactvalidator = require("../middlewares/addContactValidator");
const chatroomController = require("../controllers/chatroomController");

router.get("/", checkNotAuthenticated, (req, res) => {
    const token = req.cookies.jwt
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
            console.log(`Error ${err} Occured On Token Recognize`);
            res.redirect("/login");
        }
        else {
            try {
                const thisUserChatrooms = await getThisUserChatrooms(req);
                res.render("chatroom.ejs", { errors: undefined, inputData: undefined, chatroom: thisUserChatrooms });
            }
            catch (err) {
                console.log("Catched Error : " + err.message);
                res.redirect("/login");
            }
        }
    })
});
router.get("/getRoomMessages", checkNotAuthenticated, async (req, res) => {
    const token = req.cookies.jwt
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
            console.log(`Error ${err} Occured On Token Recognize`);
            res.redirect("/login");
        }
        else {
            try {
                const thisUser = await userModel.findById(decodedToken.id);
                const room = await roomModel.findById(req.query.roomId);
                const messages = await messageModel.find({ roomFk: req.query.roomId });
                console.log("thisUser : ", thisUser);
                console.log("room : ", room);
                console.log("room Messages : ", messages);
                res.send("this is response");
            }
            catch (err) {
                console.log("Catched Error : ", err.message);
                res.statusCode(404);
            }
        }
    })
});

router.post("/addContact", addContactvalidator.form, chatroomController.addContact);
router.post("/editContact", chatroomController.editContact);
router.post("/sendMessage", chatroomController.sendMessage);
module.exports = router;