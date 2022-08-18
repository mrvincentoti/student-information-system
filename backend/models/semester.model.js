module.exports = (sequelize, Sequelize) => {
    const Semester = sequelize.define("semester", {
        semesterName: {
            type: Sequelize.STRING,
        },
        startDate: {
            type: Sequelize.DATE
        },
        endDate: {
            type: Sequelize.DATE
        }
    });
    return Semester;
}