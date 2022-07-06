const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_SCHEMA || "postgres",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.DB_SSL == "true",
    },
  }
);
const Article = sequelize.define("Article", {
  heading: {
    type: Sequelize.STRING(256),
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING(10000),
    allowNull: true,
  },
  createdAt: { type: Sequelize.DATE, field: 'created_at' },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at' },

},
{
    timestamps: true,
    underscored: true
});
module.exports = {
  sequelize: sequelize,
  Article: Article,
};
