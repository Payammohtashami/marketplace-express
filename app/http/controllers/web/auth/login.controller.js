const Controller = require("../../controller");

class LoginController extends Controller {
    showLoginPage(req, res, next){
        try {
            res.render('login.ejs')
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = {
    LoginController: new LoginController(),
};