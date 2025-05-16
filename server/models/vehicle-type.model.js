const { Model, DataTypes } = require("sequelize");
const { postgres } = require("../config/db/postgres/connectPostgres");

class VehicleType extends Model{}

VehicleType.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: [true, "Vehicle Type already exists"]
    },

},{
    sequelize: postgres,
    modelName: "VehicleType",
    tableName: "VehicleTypes",
    timestamps: true,
})

module.exports = VehicleType