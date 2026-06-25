import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool, types } = pkg;

// Override DATE type parser (OID 1082) to return raw YYYY-MM-DD string
// instead of converting to a JS Date object (which shifts by timezone)
types.setTypeParser(1082, (val) => val);

const db = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_URL.includes("localhost")
          ? false
          : { rejectUnauthorized: false }, // Required for secure hosted DB connections (Render, Neon, etc.)
      }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      }
);

export default db;