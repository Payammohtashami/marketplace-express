const router = require('express').Router();
const { CourseController } = require('http/controllers/web/course/course.controller');


router.get('/', CourseController.getAllCourses)

module.exports = { webRouter: router }