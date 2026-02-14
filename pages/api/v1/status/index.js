import database from "infra/database.js";

/**
 * 1) Versão do Postgres
 * 2) Conexões máximas
 * 3) Conexões usadas
 */
async function status(request, response) {
  //   const query = `
  //   SELECT
  //     current_setting('server_version') AS "version",
  //     current_setting('max_connections')::int AS "max",
  //     (SELECT count(*) FROM pg_stat_activity)::int AS "used";
  // `;
  // const result = await database.query(query);
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionValue =
    databaseMaxConnectionResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;

  const databaseOpendConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname =  $1;",
    values: [databaseName],
  });

  const databaseOpendConnectionsValue =
    databaseOpendConnectionsResult.rows[0].count;

  console.log(databaseOpendConnectionsValue);

  const updatedAt = new Date().toISOString();
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionValue),
        used_connections: databaseOpendConnectionsValue,
      },
    },
    // version: result.rows[0].version,
    // max_connection: result.rows[0].max,
    // used_connection: result.rows[0].used,
  });
}

export default status;
