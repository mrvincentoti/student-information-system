module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define("department", {
        class_name: {
            type: Sequelize.STRING
        },
        session_id: {
            type: Sequelize.INTEGER
        }
    });
    return Department;
}