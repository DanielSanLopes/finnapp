import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });

  console.log("Postgres Credentials: ", {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });

  //console.log("config db:", client.connectionParameters);

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
    // throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
