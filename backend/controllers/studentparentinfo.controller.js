const db = require("../models");
const Studentparentinfo = db.studentparentinfo;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
    data = {
        fatherName: req.body.fatherName,
        fatherPhone: req.body.fatherPhone,
        motherName: req.body.motherName,
        motherPhone: req.body.motherPhone,
        parentAddress: req.body.parentAddress,
        userId: req.body.userId
    };

    const result = addStudentParentInfo(data);
    res.status(200).send({
        result: result
    });
}

exports.studentparentinfos = (req, res) => {
    Studentparentinfo.findAll({})
        .then(studentparentinfo => {
            if (!studentparentinfo) {
                res.status(400).send({ message: "Student parent info not found" })
            }
            res.status(200).send({
                studentparentinfo: studentparentinfo
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.studentparentinfo = (req, res) => {
    const id = req.params.user_id;
    Studentparentinfo.findByPk(id)
        .then(studentparentinfo => {
            if (!studentparentinfo) {
                res.status(400).send({ message: "Student parent info not found" })
            }
            res.status(200).send({
                studentparentinfo: studentparentinfo
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.edit = (req, res) => {
    const id = req.params.user_id;
    Studentparentinfo.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Studentparentinfo was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Studentparentinfo with id=${id}. Maybe Studentparentinfo was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Studentparentinfo with id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.user_id;
    Studentparentinfo.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Studentparentinfo was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Studentparentinfo with id=${id}. Maybe Studentparentinfo was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Studentparentinfo with id=" + id
            });
        });
};

// Utility functions
addStudentParentInfo = (data) => {
    Studentparentinfo.create({
        fatherName: data.fatherName,
        fatherPhone: data.fatherPhone,
        motherName: data.motherName,
        motherPhone: data.motherPhone,
        parentAddress: data.parentAddress,
        userId: data.userId
    })
        .then(studentparentinfo => {
            if (!studentparentinfo) {
                data = {
                    statusCode: 500,
                    message: "Unable to add parent information"
                };
                console.log(data);
                return data;
            } else {
                data = {
                    statusCode: 200,
                    message: "Data added successfully"
                };
                console.log(data);
                return data;
            }
        })
        .catch(err => {
            data = {
                statusCode: 500,
                message: err.message
            };
            console.log(data);
            return data;
        });
}