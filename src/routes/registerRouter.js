const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const registerValidationRules = require('../middlewares/registerValidationRules');
const checkAuth = require("../middlewares/checkAuthenticated")
const userModel = require('../models/users');
router.get("/", checkAuth, registerController.userForm);
router.post("/", checkAuth, registerValidationRules.form, registerController.register)

module.exports = router;