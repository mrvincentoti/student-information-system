const semesterController = require("../controllers/semester.controller");
const authJwt = require("../middleware/authJwt");

module.exports = (app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/semester/add",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        semesterController.add
    );

    app.get(
        "/api/semesters",
        [
            authJwt.verifyToken
        ],
        semesterController.semesters
    );

    app.get(
        "/api/semester/:semester_id",
        [
            authJwt.verifyToken
        ],
        semesterController.semester
    );

    app.put(
        "/api/semester/:semester_id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        semesterController.edit
    );

    app.delete(
        "/api/semester/:semester_id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        semesterController.delete
    );
}