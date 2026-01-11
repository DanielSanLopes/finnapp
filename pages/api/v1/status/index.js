import db from "../../../../infra/db.js";

async function statusHandler(req, res) {
  const result = await db.query("SELECT NOW() AS current_time;");
  console.log(result.rows);
  res.status(200).send({ message: "Deu certo, mãe!" });
}

export default statusHandler;
