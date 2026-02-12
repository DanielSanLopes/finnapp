import db from "infra/db.js";

async function statusHandler(req, res) {
  //-------------------------------------------------------------------------------------------
  // const result = await db.query(
  //   `SELECT 'Version' as Informacao, VERSION() as Valor
  //     UNION ALL
  //     SELECT 'Max Connections', setting FROM pg_settings WHERE name = 'max_connections';`,
  // );
  //-------------------------------------------------------------------------------------------

  //#region Uncomment to enable more detailed checks
  //const result = await db.query(`SELECT VERSION() as version, current_setting('max_connections') as max_connections,
  // (select count(*) from pg_stat_activity where backend_type = 'client backend') as active_connections;`);
  //#endregion

  const databaseVersionResult = await db.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await db.query("SHOW max_connections;");
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB || "postgres";
  console.log("Selected Database: ", databaseName);
  const databaseActiveConnectionsResult = await db.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseActiveConnectionsValue =
    databaseActiveConnectionsResult.rows[0].count;

  console.log("Active Connections:", databaseActiveConnectionsValue);
  // res.status(200).send({ message: "Deu certo, mãe!" });
  const updatedAt = new Date().toISOString();
  // console.log("result:", { updated_at: updatedAt, ...result.rows[0] });
  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        active_connections: databaseActiveConnectionsValue,
      },
    },
  });
}

export default statusHandler;
