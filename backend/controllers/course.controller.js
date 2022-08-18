const db = require("../models");
const Course = db.course;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
    Course.create({
        courseName: req.body.courseName,
        courseType: req.body.courseType,
        departmentId: req.body.departmentId,
        courseId: req.body.courseId,
        sessionId: req.body.sessionId,
        userId: req.body.userId,
        semesterId: req.body.semesterId
    })
        .then(course => {
            if (!course) {
                res.status(500).send({ message: "Unable to add Course, please try again" });
            }
            res.status(200).send({ message: "Course added successfully" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.edit = (req, res) => {
    const id = req.params.course_id;
    Course.update(req.body, {
        where: { id: id }
    })
        .then(count => {
            if (count == 1) {
                res.status(200).send({ message: "Course updated successfully" });
            } else {
                res.send({ message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!` })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Course with id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.course_id;
    Course.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Course was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Course with id=${id}. Maybe Course was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Course with id=" + id
            });
        });
}

exports.courses = (req, res) => {
    Course.findAll({})
        .then(courses => {
            if (!courses) {
                return res.status(404).send({ message: "Course Not found." });
            }
            res.status(200).send({
                courses: courses
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.course = (req, res) => {
    const id = req.params.course_id;
    Course.findByPk(id)
        .then(course => {
            if (course) {
                res.status(200).send({
                    course: course
                });
            } else {
                res.status(404).send({ message: "Course not found" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}
