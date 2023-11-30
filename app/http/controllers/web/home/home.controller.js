const Controller = require("../../controller");

class HomeController extends Controller {
    IndexPage(req, res, next){
        try {
            res.render('home.ejs');
        } catch (error) {
            console.log(error);
        }
    };
};


module.exports = {
    HomeController: new HomeController(),
};