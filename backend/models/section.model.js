module.exports = (sequelize, Sequelize) => {
    const Section = sequelize.define("section", {
        sectionName: {
            type: Sequelize.STRING,
        },
        roomNo: {
            type: Sequelize.DATE
        }
    });
    return Section;
}