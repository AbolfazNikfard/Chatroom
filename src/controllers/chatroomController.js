const jwt = require("jsonwebtoken");
const chatroom = require("../utils/chatroomClass")
const roomModel = require("../models/rooms");
const userModel = require("../models/users");
const messageModel = require("../models/messages");

module.exports = {
    getRooms: (req, res) => {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (_, decodedToken) => {
            try {
                const thisUser = await userModel.findById(decodedToken.id);
                const userRoomsWithContacts = await roomModel.find({ firstUser: thisUser.phone });
                const user_chatrooms_with_someone_who_may_not_be_among_the_contacts = await roomModel.find({ secondUser: thisUser.phone });
                const thisUserContacts = thisUser.contact;
                //console.log("userRoomsWithContact : ", userRoomsWithContacts);
                //console.log("userRoomsWithUnContact : ", user_chatrooms_with_someone_who_may_not_be_among_the_contacts);
                //console.log("thisUser Contact : ", thisUserContacts);
                let userChatrooms = [];
                for (let i = 0; i < userRoomsWithContacts.length; i++) {
                    const thisContact = thisUserContacts.find(({ Cphone }) => Cphone == userRoomsWithContacts[i].secondUser);
                    userChatrooms.push(new chatroom(
                        userRoomsWithContacts[i].id,
                        thisContact.Cname,
                        thisContact.Cphone
                    ));
                }
                for (let i = 0; i < user_chatrooms_with_someone_who_may_not_be_among_the_contacts.length; i++) {

                    const phone_of_user_that_maybe_isnt_contact = user_chatrooms_with_someone_who_may_not_be_among_the_contacts[i].firstUser;
                    const user_that_maybe_isnt_contact = await userModel.findOne({ phone: phone_of_user_that_maybe_isnt_contact });
                    const IsContact = thisUserContacts.find(({ Cphone }) => Cphone == phone_of_user_that_maybe_isnt_contact);
                    roomId = user_chatrooms_with_someone_who_may_not_be_among_the_contacts[i]._id;
                    if (IsContact) {
                        userChatrooms.push(new chatroom(
                            roomId,
                            IsContact.Cname,
                            IsContact.Cphone,
                        ));
                    }
                    else {
                        userChatrooms.push(new chatroom(
                            roomId,
                            user_that_maybe_isnt_contact.name
                        ));
                    }
                }
                res.send({
                    statusCode: 200,
                    chatrooms: userChatrooms.sort((a, b) => a.roomName.localeCompare(b.roomName))
                })
            }
            catch (err) {
                console.log("catched Error: ", err)
                res.status(500).send({
                    statusCode: 500,
                    message: "Internal Server Error"
                })
            }
        })
    },
    getmessages: async (req, res) => {
        const { roomId } = req.params;
        if (!roomId)
            res.status(400).send({
                statusCode: 400,
                message: "Bad request"
            });
        else {
            try {
                const room = await roomModel.findById(roomId);
                if (!room) {
                    res.status(404).send({
                        statusCode: 404,
                        message: "room not found"
                    })
                }
                else {
                    const roomMessages = await messageModel.find({ roomFk: roomId });
                    res.send({
                        statusCode: 200,
                        messages: roomMessages
                    })
                }
            }
            catch (err) {
                res.status(500).send({
                    statusCode: 500,
                    message: "Internal Server Error"
                })
            }
        }
    },
    sendMessage: (req, res) => {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (_, decodedToken) => {

            try {
                console.log("body: ", req.body);
                const { message, roomId } = req.body;
                if (!message || !roomId)
                    res.status(400).send({
                        statusCode: 400,
                        message: "Bad request"
                    });
                else {
                    const thisUser = await userModel.findById(decodedToken.id);
                    const newMessage = new messageModel({
                        roomFk: roomId,
                        userFk: thisUser.phone,
                        message: message
                    });
                    const addNewMessageResult = await newMessage.save();
                    console.log(`new Message ${addNewMessageResult} Added`);
                    res.send({
                        statusCode: 200,
                        message: "message added"
                    });
                }
            }
            catch (err) {
                console.log("Catched Error : ", err.message);
                res.status(500).send({
                    statusCode: 500,
                    message: "Internal Server Error"
                });
            }
        })
    }
}