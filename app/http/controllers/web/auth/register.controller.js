const { registerValidator, registerValidatorSchema } = require("../../../validations/auth.validator");
const Controller = require("../../controller");

class RegisterController extends Controller {
    showRegisterPage(req, res, next){
        try {
            res.render('register.ejs', { message : req.flash('error') })
        } catch (error) {
            console.log(error);
        }
    };

    async registerProccess(req, res, next){
        try {
            const data = await registerValidatorSchema.validateAsync(req.body).catch(err => {
                req.flash('error' , err?.message)
                res.redirect('register');
            });
            res.status(200).json({
                data,
                body: req.body,
                message: 'ثبت نام با موفقیت انجام شد',
            });
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    RegisterController: new RegisterController(),
};