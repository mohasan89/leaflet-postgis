import { Sequelize } from "sequelize"
import pg from "pg";

pg.defaults.ssl = true;

const sequel = new Sequelize(
  process.env.DATABASE_NAME ,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  }
);

export default sequel;

