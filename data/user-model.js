const db = require("./dbConfig.js");

function find() {
  return db("users").select("username, department");
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

async function insert(data) {
  const [id] = await db("users").insert(data);
  return findBy({ id });
}

module.exports = { insert, find, findBy };
