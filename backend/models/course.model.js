module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("course", {
        courseName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        courseType: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Course;
}