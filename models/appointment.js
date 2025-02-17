module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("Appointment", {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      date: { type: DataTypes.DATEONLY, allowNull: false },
      startTime: { type: DataTypes.TIME, allowNull: false },
      endTime: { type: DataTypes.TIME, allowNull: false },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', 
            key: 'id'
        }
      }
  });

  Appointment.associate = (models) => {
      Appointment.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };

  return Appointment;
};
