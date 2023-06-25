const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');
const { validationResult, matchedData } = require('express-validator');
module.exports = {
    userForm: function (req, res) {
        const recivedMessage = req.query.message;
        if (recivedMessage) {
            res.render("login.ejs", { message: recivedMessage });
        }
        else {
            res.render('login.ejs', { message: "" });
        }
    },
    validateForm: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errMsg = errors.mapped();
            var inputData = matchedData(req);
            res.render('login.ejs', { errors: errMsg, inputData: inputData, message: "" });
        }
        else {
            try {
                var inputData = matchedData(req);
                const foundedUser = await userModel.findOne({ phone: inputData.phone });
                if (!foundedUser) {
                    const errMsg = "شماره همراه یا رمز عبور اشتباه است";
                    res.render("login.ejs", { errors: errMsg, inputData: inputData, message: "" })
                }
                else {
                    const comparePass = await bcrypt.compare(inputData.password, foundedUser.Password);
                    if (!comparePass) {
                        const errMsg = "شماره همراه یا رمز عبور اشتباه است";
                        res.render("login.ejs", { errors: errMsg, inputData: inputData, message: "" })
                    }
                    else {
                        const expireDate = 3600;
                        const token = jwt.sign(
                            { id: foundedUser._id },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: expireDate } //In Second
                        );
                        res.cookie("jwt", token, {
                            httpOnly: true,
                            maxAge: expireDate * 1000, //In ms
                        });
                        console.log(`User ${foundedUser} logined`);

                        res.redirect("/");
                    }
                }
            }
            catch (err) {
                console.log("Catched Error : ", err.message);
                res.status(500)
            }
        }

    }
}