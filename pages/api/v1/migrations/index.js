import migrate from "node-pg-migrate";
import { join } from "node:path";
import { Client } from "pg";
import db from "infra/db";

async function migrationsHandler(req, res) {
  console.log(migrate);
  const dbClient = await db.getNewClient();

  if (req.method === "GET") {
    console.log("GET request received at /api/v1/migrations");

    const pendingMigrations = await migrate({
      databaseUrl: process.env.POSTGRES_URL,
      // dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations_table",
    });
    await dbClient.end();
    return res.status(200).json(pendingMigrations);
  }
  if (req.method === "POST") {
    console.log("POST request received at /api/v1/migrations");

    const doneMigrations = await migrate({
      // databaseUrl: process.env.POSTGRES_URL,
      dbClient,
      dryRun: false,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations_table",
    });

    // console.log("Migrations result:", doneMigrations);
    await dbClient.end();

    if (doneMigrations.length == 0) return res.status(200).json(doneMigrations);
    else return res.status(201).json(doneMigrations);
  }

  // 405: Method Not Allowed
  return res.status(405).end();
}

export default migrationsHandler;
