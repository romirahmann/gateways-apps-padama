const db = require("../database/db.config");

const getById = async (id) => await db("apps").where("appId", id).first();
const getAll = async () => await db.select("*").from("apps");
const update = async (id, data) =>
  await db("apps").where("appId", id).update(data);
const insert = async (data) => await db("apps").insert(data);
const del = async (id) => await db("apps").where("appId", id).delete();

const totalApp = async () => {
  const result = await db("apps").count("appId as count");
  return Number(result[0].count); // pastikan hasilnya number
};

module.exports = {
  getAll,
  getById,
  insert,
  del,
  update,
  totalApp,
};
