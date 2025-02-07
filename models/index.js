const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(require("../config/config.json")["development"]);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, DataTypes);
db.Appointment = require("./appointment")(sequelize, DataTypes);

module.exports = db;
