const db = require("../database/db.config");

const insert = async (data) => await db("log_activity").insert(data);

module.exports = { insert };
