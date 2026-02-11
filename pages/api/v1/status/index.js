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
  console.log(databaseVersionValue);
  const updatedAt = new Date().toISOString();
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
      },
    },
    // version: result.rows[0].version,
    // max_connection: result.rows[0].max,
    // used_connection: result.rows[0].used,
  });
}

export default status;
