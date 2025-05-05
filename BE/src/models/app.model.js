const db = require("../database/db.config");

const getAll = async () => await db.select("*").from("apps");
const insert = async (data) => await db("apps").insert(data);

module.exports = {
  getAll,
  insert,
};
