const { check, sanitizeBody } = require('express-validator');
exports.form = [
    //phone validation
    check('contactPhone').trim().notEmpty().withMessage("لطفا شماره همراه را وارد کنید")
        .isMobilePhone().withMessage("شماره همراه معتبر نیست")
        .isLength({ max: 11, min: 11 }).withMessage(" شماره همراه معتبر نیست"),

    // name validation
    check('contactName').trim().notEmpty().withMessage('لطفا نام را وارد کنید')
]