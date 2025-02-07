module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("Appointment", {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      slot: { type: DataTypes.DATE, allowNull: false, unique: true }
  });

  Appointment.associate = (models) => {
      Appointment.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Appointment;
};
