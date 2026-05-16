import database from "infra/db";

database.query("SELECT 1");

async function cleanDatabase() {
  await database
    .query(
      `
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
  `,
    )
    .then((value) => console.log("Schema dropped: ", value));
}

beforeAll(cleanDatabase);

test("get/api/v1/migrations should return 200", async () => {
  const res = await fetch("http://localhost:3001/api/v1/migrations");
  expect(res.status).toBe(200);
});

test("get/api/v1/migrations should return an array", async () => {
  const res = await fetch("http://localhost:3001/api/v1/migrations");
  const responseBody = await res.json();
  expect(Array.isArray(responseBody)).toBe(true);
});

test("get/api/v1/migrations should return an array grater than 0", async () => {
  const res = await fetch("http://localhost:3001/api/v1/migrations");
  const responseBody = await res.json();
  expect(responseBody.length).toBeGreaterThan(0);
});

// test.only("Teste de SQL Injection", async () => {
//   // await fetch("http://localhost:3001/api/v1/status?databaseName=local_db");
//   await fetch(
//     "http://localhost:3000/api/v1/status?databaseName=local_db'; SELECT pg_sleep(4); --",
//   );
// });
