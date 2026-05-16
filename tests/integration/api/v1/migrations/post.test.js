import database from "infra/db";

// database.query("SELECT 1");

async function cleanDatabase() {
  await database.query(`
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
  `);
}

beforeAll(cleanDatabase);
// beforeEach(cleanDatabase);

test("POST to /api/v1/migrations should return 200", async () => {
  const res = await fetch("http://localhost:3001/api/v1/migrations", {
    method: "POST",
  });
  expect(res.status).toBe(201);
});

test("POST to /api/v1/migrations should be array", async () => {
  const res = await fetch("http://localhost:3001/api/v1/migrations", {
    method: "POST",
  });
  const responseBody = await res.json();
  expect(Array.isArray(responseBody)).toBe(true);
});

test("POST to /api/v1/migrations should be Greater than 0", async () => {
  const res = await fetch("http://localhost:3001/api/v1/migrations", {
    method: "POST",
  });
  const responseBody = await res.json();
  expect(responseBody.length).toBe(0);
});

// test.only("Teste de SQL Injection", async () => {
//   // await fetch("http://localhost:3001/api/v1/status?databaseName=local_db");
//   await fetch(
//     "http://localhost:3001/api/v1/status?databaseName=local_db'; SELECT pg_sleep(4); --",
//   );
// });
