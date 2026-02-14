test("GET to /api/v1/status shourd return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  //expect(responseBody.updated_at).toBeDefined();
  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parseUpdatedAt);

  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.used_connections).toEqual(1);

  // expect(responseBody.version).toBeDefined();
  // expect(typeof responseBody.version).toBe("string");

  // // 2. Valida se as conexões são números e fazem sentido matemático
  // expect(responseBody.max_connection).toBeDefined();
  // expect(responseBody.max_connection).toBeGreaterThan(0);

  // expect(responseBody.used_connection).toBeDefined();
  // expect(responseBody.used_connection).toBeGreaterThan(0);
  // expect(responseBody.used_connection).toBeLessThanOrEqual(
  //   responseBody.max_connection,
  // );
});
