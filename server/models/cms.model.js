const { Model, DataTypes } = require("sequelize");
const { postgres } = require("../config/db/postgres/connectPostgres");

class CmsContent extends Model {}

CmsContent.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    section: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: postgres,
    modelName: "CmsContent",
    tableName: "cms_contents",
    timestamps: true,
  }
);

module.exports = CmsContent;
