const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = sequelize;
