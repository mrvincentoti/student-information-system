const db = require("../models");
const Section = db.section;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
    Section.create({
        sectionName: req.body.sectionName,
        roomNo: req.body.roomNo,
        departmentId: req.body.departmentId,
        sessionId: req.body.sessionId,
        userId: req.body.userId
    })
        .then(section => {
            if (!section) {
                res.status(500).send({ message: "Unable to add section, please try again" });
            }
            res.status(200).send({ message: "section added successfully" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.edit = (req, res) => {
    const id = req.params.section_id;
    Section.update(req.body, {
        where: { id: id }
    })
        .then(count => {
            if (count == 1) {
                res.status(200).send({ message: "section updated successfully" });
            } else {
                res.send({ message: `Cannot update section with id=${id}. Maybe section was not found or req.body is empty!` })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating section with id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.section_id;
    Section.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "section was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete section with id=${id}. Maybe section was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete section with id=" + id
            });
        });
}

exports.sections = (req, res) => {
    Section.findAll({})
        .then(sections => {
            if (!sections) {
                return res.status(404).send({ message: "section Not found." });
            }
            res.status(200).send({
                sections: sections
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.section = (req, res) => {
    const id = req.params.section_id;
    Section.findByPk(id)
        .then(section => {
            if (section) {
                res.status(200).send({
                    section: section
                });
            } else {
                res.status(404).send({ message: "section not found" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}
