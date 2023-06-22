const { check, sanitizeBody } = require('express-validator');
exports.form = [
     //name Validation
     check('fname').trim().notEmpty().withMessage("لطفا نام را وارد کنید"),
     //phone validation
     check('phone').trim().notEmpty().withMessage("لطفا شماره همراه را وارد کنید")
          .isMobilePhone().withMessage("شماره همراه معتبر نیست")
          .isLength({ max: 11, min: 11 }).withMessage(" شماره همراه معتبر نیست"),

     // password validation
     check('password').trim().notEmpty().withMessage('لطفا رمز عبور را وارد کنید')
          .isLength({ min: 6 }).withMessage('رمز عبور حداقل باید دارای 6 کارکتر باشد')
          .matches(/(?=.*?[A-Z])/).withMessage('رمز عبور باید حداقل دارای یک حرف انگلیسی بزرگ باشد')
          .matches(/(?=.*?[a-z])/).withMessage('رمز عبور باید حداقل دارای یک حرف انگلیسی کوچک باشد')
          .matches(/(?=.*?[0-9])/).withMessage('رمز عبور باید حداقل دارای یک عدد باشد')
          .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('رمز عبور باید حداقل دارای یک کارکتر خاص (#$!@%^&*-) باشد')
          .not().matches(/^$|\s+/).withMessage('رمز عبور نباید دارای فضای  خالی باشد'),

     // confirm password validation
     check('confirmPassword').trim().notEmpty().withMessage("لطفا تکرار رمز عبور را وارد کنید"),
     check('confirmPassword').custom((value, { req }) => {
          if (value !== req.body.password) {
               throw new Error('رمز عبور و تکرار رمز عبور مطابقت ندارند');
          }
          return true;
     })
]