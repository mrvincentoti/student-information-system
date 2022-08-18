const authJwt = require("../middleware/authJwt");
const sectionController = require("../controllers/section.controller");

module.exports = (app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/section/add",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        sectionController.add
    );

    app.get(
        "/api/sections",
        [
            authJwt.verifyToken
        ],
        sectionController.sections
    );

    app.get(
        "/api/section/:section_id",
        [
            authJwt.verifyToken
        ],
        sectionController.section
    );

    app.put(
        "/api/section/:section_id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        sectionController.edit
    );

    app.delete(
        "/api/section/:section_id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        sectionController.delete
    );
}