const jwt = require("jsonwebtoken");
const Chatroom = require("./userChatroomPageClass");
const userModel = require("../models/users");
const roomModel = require("../models/rooms");
const messageModel = require("../models/messages");
module.exports = getUserChatrooms = (req) => {
    return new Promise(async (resolve, reject) => {
        const token = req.cookies.jwt
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                reject(err);
            }
            else {
                try {
                    const thisUser = await userModel.findOne({ _id: decodedToken.id });
                    const userRoomsWithContacts = await roomModel.find({ firstUser: thisUser.phone });
                    const userRoomsWithUncontacts = await roomModel.find({ secondUser: thisUser.phone });
                    const thisUserContact = thisUser.contact;
                    console.log("userRoomsWithContact : ", userRoomsWithContacts);
                    console.log("userRoomsWithUnContact : ", userRoomsWithUncontacts);
                    console.log("thisUser Contact : ", thisUserContact);

                    let Chatrooms = {};
                    Chatrooms.userName = thisUser.name;
                    Chatrooms.userPhone = thisUser.phone;
                    Chatrooms.rooms = [];
                    for (let i = 0; i < userRoomsWithContacts.length; i++) {
                        const roomMessages = await messageModel.find({ roomFk: userRoomsWithContacts[i]._id });
                        const thisUserContactName = thisUserContact.find(({ Cphone }) => Cphone == userRoomsWithContacts[i].secondUser);
                        Chatrooms.rooms.push(new Chatroom(
                            userRoomsWithContacts[i]._id,
                            thisUserContactName.Cname,
                            userRoomsWithContacts[i].secondUser,
                            roomMessages
                        ));
                        //userChatroom.rooms[i].messages = roomMessages;
                    }
                    for (let i = 0; i < userRoomsWithUncontacts.length; i++) {
                        const roomMessages = await messageModel.find({ roomFk: userRoomsWithUncontacts[i]._id });
                        const UncontactUser = await userModel.findOne({ phone: userRoomsWithUncontacts[i].firstUser });
                        const IsContact = thisUserContact.find(({ Cphone }) => Cphone == userRoomsWithUncontacts[i].firstUser);
                        if (IsContact) {
                            Chatrooms.rooms.push(new Chatroom(
                                userRoomsWithUncontacts[i]._id,
                                IsContact.Cname,
                                IsContact.Cphone,
                                roomMessages
                            ));
                        }
                        else {
                            Chatrooms.rooms.push(new Chatroom(
                                userRoomsWithUncontacts[i]._id,
                                UncontactUser.name,
                                UncontactUser.phone,
                                roomMessages
                            ));
                        }
                    }
                    Chatrooms.rooms.sort((a, b) => a.roomName.localeCompare(b.roomName));
                    console.log("User Chatrooms : ", Chatrooms);
                    resolve(Chatrooms);
                }
                catch (err) {
                    reject(err);
                }
            }
        });
    });
}