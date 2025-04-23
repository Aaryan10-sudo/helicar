const { Model, DataTypes } = require("sequelize");
const { postgres } = require("../config/db/postgres/connectPostgres");

class VehicleCategory extends Model{}

VehicleCategory.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: [true, "Vehicle Category already exists"]
    },
},
{
    sequelize:postgres,
    modelName: "VehicleCategory",
    tableName: "VehicleCategories",
    timestamps: true,
})

module.exports = VehicleCategory
