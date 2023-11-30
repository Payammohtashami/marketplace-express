const Controller = require("http/controllers/controller");

class CourseController extends Controller {
    getAllCourses(req, res, next){
        try {
            res.status(200).json({
                message: 'web page'
            })
        } catch (error) {
            next(error);
        };
    };
};

module.exports = {
    CourseController: new CourseController(),
};