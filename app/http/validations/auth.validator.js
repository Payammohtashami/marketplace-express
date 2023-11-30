const Joi = require('@hapi/joi');

const registerValidatorSchema = Joi.object({
    name: Joi.string().required().error(new Error('نام کاربری وارد شده صحیح نمی باشد')),
    email: Joi.string().email().required().error(new Error('ایمیل وارد شده صحیح نمی باشد')),
    password: Joi.string().max(32).min(8).required().error(new Error('رمز عبور وارد شده صحیح نمی باشد')),
});

module.exports = {
    registerValidatorSchema,
};