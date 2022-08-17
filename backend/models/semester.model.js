module.exports = (sequelize, Sequelize) => {
    const Semester = sequelize.define("semester", {
        semester_name: {
            type: Sequelize.STRING,
        },
        start_date: {
            type: Sequelize.DATE
        },
        end_date: {
            type: Sequelize.DATE
        }
    });
    return Semester;
}