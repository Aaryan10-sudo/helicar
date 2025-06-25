const { Model, DataTypes } = require("sequelize");
const { postgres } = require("../config/db/postgres/connectPostgres");

class PopularDestination extends Model {}

PopularDestination.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    itinerary: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize: postgres,
    modelName: "PopularDestination",
    tableName: "PopularDestinations",
  }
);

module.exports = PopularDestination;
