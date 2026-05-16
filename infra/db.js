import { Client } from "pg";

async function query(queryObject) {
  console.log("Postgres Credentials: ", {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });

  //console.log("config db:", client.connectionParameters);
  let client;
  try {
    client = await getNewClient();
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

async function getNewClient() {
  const client = new Client({
    // connectionString: process.env.POSTGRES_URL,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: process.env.NODE_ENV === "production" ? true : false,
    // ssl: {
    //   require: "require",
    //   rejectUnauthorized: true,
    // },
    // channelBinding: true,
  });

  await client.connect().then((result) => {
    console.log("Connected to PostgreSQL database successfully.");
  });
  return client;
}

export default {
  query,
  getNewClient,
};
