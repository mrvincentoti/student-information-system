const authJwt = require("../middleware/authJwt");
const departmentController = require("../controllers/department.controller");

module.exports = (app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/department/add",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        departmentController.add
    );

    app.get(
        "/api/departments",
        [
            authJwt.verifyToken
        ],
        departmentController.departments
    );

    app.get(
        "/api/department/:department_id",
        [
            authJwt.verifyToken
        ],
        departmentController.department
    );

    app.put(
        "/api/department/:department_id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        departmentController.edit
    );

    app.delete(
        "/api/department/:department_id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        departmentController.delete
    );
}