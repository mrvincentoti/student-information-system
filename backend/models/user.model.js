module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nationality: {
            type: Sequelize.STRING,
            allowNull: true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true
        },
        city: {
            type: Sequelize.STRING,
            allowNull: true
        },
        zip: {
            type: Sequelize.STRING,
            allowNull: true
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        birthday: {
            type: Sequelize.STRING,
            allowNull: true
        },
        bloodType: {
            type: Sequelize.STRING,
            allowNull: true
        },
        religion: {
            type: Sequelize.STRING,
            allowNull: true
        },
        password: {
            type: Sequelize.STRING
        }
    });
    return User;
};