const bcrypt = require('bcrypt');
const userModel = require('../models/users');
const { validationResult, matchedData } = require('express-validator');
module.exports = {
    userForm: function (req, res) {
        res.render('register.ejs');
    },
    validateForm: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errMsg = errors.mapped();
            var inputData = matchedData(req);
            res.render('register.ejs', { errors: errMsg, inputData: inputData });
        }
        else {
            try {
                var inputData = matchedData(req);
                const foundedUser = await userModel.findOne({ phone: inputData.phone });
                if (foundedUser) {
                    const errMsg = "این شماره همراه قبلا ثبت نام کرده است";
                    res.render("register.ejs", { errors: errMsg, inputData: inputData })
                }
                else {
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                   
                    const newUser = new userModel({
                        name: inputData.fname,
                        phone: inputData.phone,
                        Password: hashedPassword                  
                    });
                    const newUserAddedStatus = await newUser.save();
                    console.log("new user added : ", newUserAddedStatus);
                    const successfullRegisterMessage = encodeURIComponent('ثبت نام با موفقیت انجام شد. لطفا وارد شوید');
                    res.redirect("/login?message=" + successfullRegisterMessage);
                }
            }
            catch (err) {
                console.log("Catched Error : ", err.message);
                res.render("register.ejs");
            }
        }
    }
}