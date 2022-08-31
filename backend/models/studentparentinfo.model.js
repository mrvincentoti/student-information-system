module.exports = (sequelize, Sequelize) => {
    const ParentInfo = sequelize.define("studentparentinfo", {
        /* 
            include the studentId as a foreign key 
            in the model/index.js file
        */
        fatherName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        fatherPhone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        motherName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        parentAddress: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return ParentInfo;
}