const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const loginValidationRules = require('../middlewares/loginValidationRules');
const checkAuth = require("../middlewares/checkAuthenticated");
router.get("/", checkAuth, loginController.userForm);
router.post("/", checkAuth, loginValidationRules.form, loginController.validateForm)
module.exports = router;