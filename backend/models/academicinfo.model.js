module.exports = (sequelize, Sequelize) => {
    const Academicinfo = sequelize.define("academicinfo", {
        boardRegNo: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Academicinfo;
}