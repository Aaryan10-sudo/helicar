const { Model, DataTypes } = require("sequelize");
const { postgres } = require("../config/db/postgres/connectPostgres");
const VehicleCategory = require("./vehicle-category.model");
const VehicleType = require("./vehicle-type.model");

class Vehicle extends Model {}

Vehicle.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    vehicleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberPlate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    vehicleCategory: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "VehicleCategories",
        key: "id",
      },
    },
    vehicleType: {
      type: DataTypes.UUID,
      references: {
        model: "VehicleTypes",
        key: "id",
      },
      allowNull: false,
    },
    features: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    vehicleImage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    vehicleBrand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicleDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    vehiclePrice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicleStatus: {
      type: DataTypes.ENUM("Occupied", "Vacant"),
      allowNull: false,
      defaultValue: "Vacant",
    },

    driverInfo: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize: postgres,
    modelName: "Vehicle",
    tableName: "Vehicles",
    timestamps: true,
  }
);

Vehicle.belongsTo(VehicleCategory, {
  foreignKey: "vehicleCategory",
  targetKey: "id",
  as: "category",
});
VehicleCategory.hasMany(Vehicle, {
  foreignKey: "vehicleCategory",
  as: "vehicles",
});

Vehicle.belongsTo(VehicleType, {
  foreignKey: "vehicleType",
  targetKey: "id",
  as: "type",
});
VehicleType.hasMany(Vehicle, {
  foreignKey: "vehicleType",
  as: "vehicles",
});

module.exports = Vehicle;
