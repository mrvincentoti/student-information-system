module.exports = (sequelize, Sequelize) => {
    const Promotions = sequelize.define("promotions", {
        idCardNo: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Promotions;
}