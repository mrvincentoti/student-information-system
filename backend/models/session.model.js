module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define("session", {
        session_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Session;
};