const db = require("../models");
const User = db.user;
const StudentParentInfo = db.studentparentinfo;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const AcademicInfo = db.academicinfo;
const Promotion = db.promotions;

exports.addStudent = (req, res) => {
    // Save User to Database
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        gender: req.body.gender,
        nationality: req.body.nationality,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        zip: req.body.zip,
        photo: req.body.photo,
        birthday: req.body.birthday,
        bloodType: req.body.bloodType,
        religion: req.body.religion,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (user) {
                user.setRoles([3]).then(() => {
                    addStudentParentInfo(req.body, user.id);
                    addAcademicInfo(req.body, user.id);
                    assignClassSection(req.body, user.id);
                    res.status(200).send({ message: "Student was registered successfully!" });
                });
            } else {
                res.status(500).send({ message: "Error adding student, please try again!" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.updateStudent = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                updateStudentParentInfo(req.body, id);
                updateAcademicInfo(req.body, id);
                updateClassSection(req.body, id);
                res.status(200).send({
                    message: "Student updated successfully."
                });
            } else {
                res.status(500).send({
                    message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error updating Student with id=" + id
            });
        });
}


// parent info
addStudentParentInfo = (data, uid) => {
    StudentParentInfo.create({
        fatherName: data.fatherName,
        fatherPhone: data.fatherPhone,
        motherName: data.motherName,
        motherPhone: data.motherPhone,
        parentAddress: data.parentAddress,
        userId: uid
    });
}
updateStudentParentInfo = (data, id) => {
    StudentParentInfo.update(data, {
        where: { id: id }
    });
}

// Academic information
addAcademicInfo = (data, uid) => {
    AcademicInfo.create({
        boardRegNo: data.registrationNumber,
        userId: uid
    });
}
updateAcademicInfo = (data, id) => {
    AcademicInfo.update(data, {
        where: { userId: id }
    });
}

// Promotion
assignClassSection = (data, uid) => {
    Promotion.create({
        idCardNo: data.cardNumber,
        sessionId: data.sessionId,
        departmentId: data.departmentId,
        sectionId: data.sectionId,
        userId: uid
    });
}
updateClassSection = (data, id) => {
    Promotion.update(data, {
        where: { userId: id }
    });
}
