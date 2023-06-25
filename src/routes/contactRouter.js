const express = require("express");
const { addContactInputValidation } = require("../middlewares/addContactValidator");
const { addContact, editContact } = require("../controllers/contactController");
const editContactInputValidation = require("../middlewares/editContactInputValidation");
const checkNotAuthenticated = require("../middlewares/checkNotAuthenticated");
const router = express.Router();
router.post("/addcontact", checkNotAuthenticated, addContactInputValidation, addContact);
router.post("/editContact", checkNotAuthenticated, editContactInputValidation, editContact);
module.exports = router;