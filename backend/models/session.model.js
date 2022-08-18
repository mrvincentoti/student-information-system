module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define("session", {
        sessionName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Session;
};