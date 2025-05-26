const { Model, DataTypes, UUIDV4 } = require("sequelize");

class Otp extends Model {}

Otp.init({
  id: {
    type: DataTypes.UUID,
    default: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  otp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Otp;
