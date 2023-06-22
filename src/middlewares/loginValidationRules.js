const { check, sanitizeBody } = require('express-validator');
exports.form = [
  //phone validation
  check('phone').trim().notEmpty().withMessage("لطفا شماره همراه را وارد کنید")
    .isMobilePhone().withMessage("شماره همراه معتبر نیست")
    .isLength({ max: 11, min: 11 }).withMessage(" شماره همراه معتبر نیست"),

  // password validation
  check('password').trim().notEmpty().withMessage('لطفا رمز عبور را وارد کنید')]