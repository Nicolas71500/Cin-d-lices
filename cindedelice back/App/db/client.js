import "dotenv/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE_URL || process.env.POSTGRES_URL,
  {
    dialect: "postgres",
    dialectOptions: {
      ssl:
        process.env.NODE_ENV === "production"
          ? {
              require: true,
              rejectUnauthorized: false,
            }
          : false,
    },
    logging: process.env.NODE_ENV === "development" ? console.log : false,
  }
);

export default sequelize;
