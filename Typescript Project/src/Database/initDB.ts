import pool from "../Database/dbconfig.ts";
import fs from "fs";
import path from "path";

async function initDB() {
  const schemaPath = path.join(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");
  await pool.query(schema);
  console.log("Database schema initialized");
  process.exit(0);
}

initDB().catch(err => {
  console.error("DB init error:", err);
  process.exit(1);
});

//we will run this once to create table in our db