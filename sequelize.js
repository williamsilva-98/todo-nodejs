const Sequelize = require("sequelize");
const mysql2 = require("mysql2");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: mysql2,
    logging: false,
    define: {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = sequelize;
