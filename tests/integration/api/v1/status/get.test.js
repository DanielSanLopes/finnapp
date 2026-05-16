test("get/api/v1/status should return 200", async () => {
  const res = await fetch("http://localhost:3001/api/v1/status");
  expect(res.status).toBe(200);

  const responseBody = await res.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(parsedUpdatedAt).not.toBe(new Date(null).toISOString());
  // expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  // #region Uncomment to enable more detailed checks
  // expect(responseBody.version).toBeDefined();
  // expect(responseBody.max_connections).toBeDefined();
  // expect(responseBody.active_connections).toBeDefined();

  // expect(typeof responseBody.version).toBe("string");
  // expect(typeof responseBody.max_connections).toBe("string");
  // expect(typeof responseBody.active_connections).toBe("string");

  // expect(responseBody.version).not.toBe("");
  // expect(responseBody.max_connections).not.toBe("");
  // expect(responseBody.active_connections).not.toBe("");
  // #endregion

  expect(responseBody.dependencies.database.version).toEqual("16.11");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.active_connections).toEqual(1);

  console.log(responseBody);
});

// test.only("Teste de SQL Injection", async () => {
//   // await fetch("http://localhost:3001/api/v1/status?databaseName=local_db");
//   await fetch(
//     "http://localhost:3001/api/v1/status?databaseName=local_db'; SELECT pg_sleep(4); --",
//   );
// });
