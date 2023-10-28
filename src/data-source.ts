import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
const SnakeNamingStrategy =
  require("typeorm-naming-strategies").SnakeNamingStrategy;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ["src/entity/*.ts"],
  migrations: ["src/migration/*.ts"],
  // migrations: [],
  subscribers: [],
  migrationsTableName: "migrations",
  namingStrategy: new SnakeNamingStrategy(),
});
