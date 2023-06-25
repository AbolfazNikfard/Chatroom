const bcrypt = require('bcrypt');
const userModel = require('../models/users');
const { validationResult, matchedData } = require('express-validator');
module.exports = {
    userForm: function (_, res) {
        res.render('register.ejs');
    },
    register: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errMsg = errors.mapped();
            const inputData = matchedData(req);
            res.render('register.ejs', { errors: errMsg, inputData: inputData });
        }
        else {

            const inputData = matchedData(req);
            userModel.findOne({ phone: inputData.phone })
                .then((foundedUser) => {
                    if (foundedUser) {
                        const errMsg = "این شماره همراه قبلا ثبت نام کرده است";
                        res.render("register.ejs", { errors: errMsg, inputData: inputData })
                    }
                    else {
                        bcrypt.hash(req.body.password, 10)
                            .then((hashedPassword) => {
                                const newUser = new userModel({
                                    name: inputData.fname,
                                    phone: inputData.phone,
                                    Password: hashedPassword
                                });
                                newUser.save()
                                    .then((newUserAddedStatus) => {
                                        console.log("new user added : ", newUserAddedStatus);
                                        const successfullRegisterMessage = encodeURIComponent('ثبت نام با موفقیت انجام شد. لطفا وارد شوید');
                                        res.redirect("/login?message=" + successfullRegisterMessage);
                                    })
                                    .catch((err) => {
                                        console.log("Catched Error : ", err.message);
                                        res.status(400).send({
                                            status: 400,
                                            message: "Bad request"
                                        });
                                    })
                            })
                            .catch((err) => {
                                console.log("Catched Error : ", err.message);
                                res.status(500).send({
                                    status: 500,
                                    message: "Internal server error"
                                });
                            })
                    }
                })
                .catch((err) => {
                    console.log("Catched Error : ", err.message);
                    res.status(500).send({
                        status: 500,
                        error: "Internal server error"
                    });
                })
        }
    }
}