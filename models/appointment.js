module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("Appointment", {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      slot: { type: DataTypes.DATE, allowNull: false, unique: true },
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
