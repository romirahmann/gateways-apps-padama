const db = require("../database/db.config");

const getByDate = async (date) =>
  await db("log_activity")
    .whereRaw("DATE(createdAt) = ?", [date])
    .orderBy("createdAt", "desc");
const insert = async (data) => await db("log_activity").insert(data);

module.exports = { insert, getByDate };
