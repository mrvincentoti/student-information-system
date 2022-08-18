const db = require("../models");
const Department = db.department;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
    Department.create({
        className: req.body.className,
        sessionId: req.body.sessionId,
        userId: req.body.userId
    })
        .then(department => {
            if (!department) {
                res.status(500).send({ message: "Unable to add department, please try again." });
            }
            res.send({ message: "Department was added successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.departments = (req, res) => {
    Department.findAll({})
        .then(departments => {
            if (!departments) {
                return res.status(404).send({ message: "Departments Not found." });
            }
            res.status(200).send({
                departments: departments
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.department = (req, res) => {
    const id = req.params.department_id;
    Department.findByPk(id)
        .then(department => {
            if (department) {
                res.status(200).send({
                    department: department
                });
            } else {
                res.status(404).send({ message: "Department not found" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.edit = (req, res) => {
    console.log(req.params);
    const id = req.params.department_id;
    Department.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Department was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Department with id=${id}. Maybe Department was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Department with id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.department_id;
    Department.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Department was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Department with id=${id}. Maybe Department was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Department with id=" + id
            });
        });
}