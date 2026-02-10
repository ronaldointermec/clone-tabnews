test("GET to /api/v1/status shourd return 200", async () => {
  const response = await fetch("https://devhon.com.br/api/v1/status");
  expect(response.status).toBe(200);
});
