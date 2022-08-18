const authJwt = require("../middleware/authJwt");
const courseController = require("../controllers/course.controller");

module.exports = (app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/course/add",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        courseController.add
    );

    app.get(
        "/api/courses",
        [
            authJwt.verifyToken
        ],
        courseController.courses
    );

    app.get(
        "/api/course/:course_id",
        [
            authJwt.verifyToken
        ],
        courseController.course
    );

    app.put(
        "/api/course/:course_id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        courseController.edit
    );

    app.delete(
        "/api/course/:course_id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        courseController.delete
    );
}