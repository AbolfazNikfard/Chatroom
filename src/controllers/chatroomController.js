const { validationResult, matchedData } = require('express-validator');
const jwt = require("jsonwebtoken");
const getThisUserChatrooms = require("../dist/getUserChatroomPage");
const roomModel = require("../models/rooms");
const userModel = require("../models/users");
const messageModel = require('../models/messages');

module.exports = {
    addContact: (req, res) => {
        const errors = validationResult(req);
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(`Error ${err} Occured On Token Recognize`);
                res.redirect("/login");
            }
            else {
                try {
                    const thisUser = await userModel.findOne({ _id: decodedToken.id });
                    const inputData = matchedData(req);
                    const contactWannaAddExcistOnDb = await userModel.findOne({ phone: inputData.contactPhone });
                    const thisUserChatrooms = await getThisUserChatrooms(req);
                    let errMsg;
                    if (!errors.isEmpty()) {
                        errMsg = errors.mapped();
                        res.render("chatroom.ejs", { errors: errMsg, inputData: inputData, chatroom: thisUserChatrooms });
                    }
                    if (contactWannaAddExcistOnDb) {

                        const excistOnContactList = await userModel.findOne({ _id: thisUser._id, contact: { $elemMatch: { Cphone: inputData.contactPhone } } })
                        if (excistOnContactList) {
                            errMsg = {
                                otherError: {
                                    msg: "مخاطب از قبل اضافه شده است"
                                }
                            }
                            res.render("chatroom.ejs", { errors: errMsg, inputData: inputData, chatroom: thisUserChatrooms });
                        }
                        else {
                            const contactList = thisUser.contact;
                            contactList.push({
                                Cname: inputData.contactName,
                                Cphone: inputData.contactPhone
                            });
                            const updateContactListStatus = await userModel.updateOne({ phone: thisUser.phone }, { contact: contactList });
                            const newRoom = new roomModel({
                                firstUser: thisUser.phone,
                                secondUser: inputData.contactPhone
                            })
                            let newRoomAddResult;
                            if (!await roomModel.findOne({ firstUser: inputData.contactPhone, secondUser: thisUser.phone })) {
                                newRoomAddResult = await newRoom.save();
                            }
                            console.log("updateOperationStatus : ", updateContactListStatus);
                            console.log("newRoomAddedResult : ", newRoomAddResult);
                            res.redirect("/");
                        }
                    }
                    else {
                        errMsg = {
                            otherError: {
                                msg: "مخاطب وارد شده در پیامرسان ثبت نام نکرده است"
                            }
                        }
                        res.render("chatroom.ejs", { errors: errMsg, inputData: inputData, chatroom: thisUserChatrooms });
                    }
                }
                catch (err) {
                    console.log("Catched Error : " + err.message);
                    res.redirect("/");
                }
            }
        });
    },
    editContact: (req, res) => {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(`Error ${err} Occured On Token Recognize`);
                res.redirect("/login");
            }
            else {
                try {
                    const thisUser = await userModel.findById(decodedToken.id);
                    const contactList = thisUser.contact;
                    const editUserPhone = req.body.contactPhone
                    console.log("contactList: ", contactList);
                    console.log("Edit contact request body: ", req.body);
                    console.log("contact phone: ", editUserPhone);
                    const contactSelected = contactList.find((contact) => contact.Cphone === editUserPhone);
                    console.log("contact selected: ", contactSelected);
                    if (contactSelected) {
                        const contactSelectedIndex = contactList.find((contact) => contact.Cphone === editUserPhone);
                        contactSelected.Cname = req.body.contactName;
                        contactList[contactSelectedIndex] = contactSelected;

                        const editContactResult = await userModel.updateOne({ _id: thisUser._id }, { contact: contactList });
                        console.log("result Of Edit Contact Name: ", editContactResult);
                        res.redirect("/");
                    }
                    else {
                        res.send({
                            error:"contact not found"
                        });
                    }
                }
                catch (err) {
                    console.log("Catched Error : " + err.message);
                    res.redirect("/");
                }
            }
        })
    },
    sendMessage: (req, res) => {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(`Error ${err} Occured On Token Recognize`);
                res.redirect("/login");
            }
            else {
                try {
                    const thisUser = await userModel.findById(decodedToken.id);
                    const newMessage = new messageModel({
                        roomFk: req.body.roomId,
                        userFk: thisUser.phone,
                        message: req.body.Message
                    });
                    const addNewMessageResult = await newMessage.save();
                    console.log(`new Message ${addNewMessageResult} Added`);
                    res.redirect("/");
                }
                catch (err) {
                    console.log("Catched Error : " + err.message);
                    res.redirect("/");
                }
            }
        })
    }
}