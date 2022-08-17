const db = require("../models");
const config = require("../config/auth.config");
const Session = db.session;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
    // save session to database
    Session.create({
        session_name: req.body.session_name,
        userId: req.body.userId
    })
        .then(session => {
            if (!session) {
                return res.status(500).send({ message: "Unable to add session, please try again." });
            }
            res.send({ message: "Session was added successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}