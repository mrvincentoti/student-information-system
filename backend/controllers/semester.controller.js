const db = require("../models");
const Semester = db.semester;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
    Semester.create({
        semesterName: req.body.semesterName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        sessionId: req.body.sessionId,
        userId: req.body.userId
    })
        .then(semester => {
            if (!semester) {
                res.status(500).send({ message: "Unable to add Semester, please try again" });
            }
            res.status(200).send({ message: "Semester added successfully" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.edit = (req, res) => {
    const id = req.params.semester_id;
    Semester.update(req.body, {
        where: { id: id }
    })
        .then(count => {
            if (count == 1) {
                res.status(200).send({ message: "Semester updated successfully" });
            } else {
                res.send({ message: `Cannot update Semester with id=${id}. Maybe Semester was not found or req.body is empty!` })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Semester with id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.semester_id;
    Semester.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Semester was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Semester with id=${id}. Maybe Semester was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Semester with id=" + id
            });
        });
}

exports.semesters = (req, res) => {
    Semester.findAll({})
        .then(semesters => {
            if (!semesters) {
                return res.status(404).send({ message: "Semester Not found." });
            }
            res.status(200).send({
                semesters: semesters
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.semester = (req, res) => {
    const id = req.params.semester_id;
    Semester.findByPk(id)
        .then(semester => {
            if (semester) {
                res.status(200).send({
                    semester: semester
                });
            } else {
                res.status(404).send({ message: "Semester not found" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}