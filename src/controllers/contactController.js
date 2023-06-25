const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
const roomModel = require("../models/rooms");

module.exports = {
    addContact: (req, res) => {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (_, decodedToken) => {
            try {
                const { contactPhone, contactName } = req.body;
                const thisUser = await userModel.findById(decodedToken.id);
                const existUser = await userModel.findOne({ phone: contactPhone });
                if (!existUser) {
                    res.send({
                        statusCode: 404,
                        message: "شماره همراه وارد شده در پیامرسان اکانتی ندارد"
                    })
                }
                else {
                    const userContacts = thisUser.contact;
                    const existInUserContact = userContacts.find(contact => contact.Cphone === contactPhone);
                    if (existInUserContact) {
                        res.send({
                            statusCode: 404,
                            message: "مخاطب از قبل اضافه شده است"
                        })
                    }
                    else {
                        userContacts.push({
                            Cname: contactName,
                            Cphone: contactPhone
                        })
                        const updateContactListResult = await userModel.updateOne({ phone: thisUser.phone }, { contact: userContacts });
                        console.log("updateOperationStatus : ", updateContactListResult);
                        if (!await roomModel.findOne({ firstUser: contactPhone, secondUser: thisUser.phone })) {
                            const newRoom = new roomModel({
                                firstUser: thisUser.phone,
                                secondUser: contactPhone
                            })
                            const newRoomAddResult = await newRoom.save();
                            console.log("newRoomAddedResult : ", newRoomAddResult);
                        }

                        res.send({
                            statusCode: 200
                        })
                    }
                }
            }
            catch (err) {
                console.log("catched error: ", err.message)
                res.status(500).send({
                    statusCode: 500,
                    message: "Internal Server Error"
                })
            }
        })
    },
    editContact: (req, res) => {
        const token = req.cookies.jwt;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (_, decodedToken) => {
            try {
                const thisUser = await userModel.findById(decodedToken.id);
                const contactList = thisUser.contact;
                const { contactPhone, contactNewName } = req.body;
                console.log("contactList: ", contactList);
                const contactSelected = contactList.find((contact) => contact.Cphone === contactPhone);
                console.log("contact selected: ", contactSelected);
                if (contactSelected) {
                    const contactSelectedIndex = contactList.find((contact) => contact.Cphone === contactPhone);
                    contactSelected.Cname = contactNewName;
                    contactList[contactSelectedIndex] = contactSelected;

                    await userModel.updateOne({ _id: thisUser._id }, { contact: contactList });

                    res.send({
                        statusCode: 200,
                        message: "نام مخاطب تغییر یافت"
                    });
                }
                else {
                    res.status(404).send({
                        statusCode: 404,
                        message: "مخاطب پیدا نشد"
                    });
                }
            }
            catch (err) {
                console.log("Catched Error : " + err.message);
                res.status(500).send({
                    statusCode: 500,
                    message: "مشکلی پیش آمده است لطفا بعدا امتحان کنید"
                });
            }
        })
    },
}