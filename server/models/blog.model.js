const { Model, DataTypes } = require("sequelize");
const { postgres } = require("../config/db/postgres/connectPostgres");

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mainTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    content: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    sequelize: postgres,
    modelName: "Blog",
    tableName: "Blogs",
    timestamps: true,
  }
);

module.exports = Blog;
