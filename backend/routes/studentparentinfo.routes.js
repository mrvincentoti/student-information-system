const { authJwt } = require("../middleware");
const Studentparentinfo = require("../controllers/studentparentinfo.controller");

module.exports = (app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/studentparentinfo/add",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        Studentparentinfo.add
    );

    app.get(
        "/api/studentparentinfo",
        [
            authJwt.verifyToken
        ],
        Studentparentinfo.studentparentinfos
    );

    app.get(
        "/api/studentparentinfo/:user_id",
        [
            authJwt.verifyToken
        ],
        Studentparentinfo.studentparentinfo
    );

    app.delete(
        "/api/studentparentinfo/:user_id",
        [
            authJwt.verifyToken
        ],
        Studentparentinfo.delete
    );
}