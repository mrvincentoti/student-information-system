const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: 0,
        logging: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.department = require("./department.model.js")(sequelize, Sequelize);
db.semester = require("./semester.model.js")(sequelize, Sequelize);
db.course = require("./course.model.js")(sequelize, Sequelize);
db.section = require("./section.model.js")(sequelize, Sequelize);
// User role
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

// Session
db.session.belongsTo(db.user, {});
// Department
db.department.belongsTo(db.user, {});
// Session
db.semester.belongsTo(db.session, {});
db.semester.belongsTo(db.user, {});
// Course
db.course.belongsTo(db.department, {});
db.course.belongsTo(db.session, {});
db.course.belongsTo(db.semester, {});
db.course.belongsTo(db.user, {});
// Section
db.section.belongsTo(db.department, {});
db.section.belongsTo(db.session, {});
db.section.belongsTo(db.user, {});


db.ROLES = ["user", "admin", "student", "teacher", "librarian", "hod", "cordinator", "moderator"];
module.exports = db;