module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define("department", {
        className: {
            type: Sequelize.STRING
        },
        sessionId: {
            type: Sequelize.INTEGER
        }
    });
    return Department;
}