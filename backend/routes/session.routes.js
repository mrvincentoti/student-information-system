const sessionController = require("../controllers/session.controller");
const authJwt = require("../middleware/authJwt");

module.exports = (app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/session/add",
        [authJwt.verifyToken, authJwt.isAdmin],
        sessionController.add
    );
}