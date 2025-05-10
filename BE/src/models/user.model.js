const db = require("../database/db.config");

// USERS
const getAll = async () =>
  db
    .select("u.userId", "u.username", "u.roleId", "ur.roleName")
    .from("users as u")
    .join("user_role as ur", "u.roleId", "ur.roleId");

const login = async (username) =>
  await db("users").where("username", username).first();

const insert = async (data) => await db("users").insert(data);

const del = async (userId) =>
  await db("users").where("userId", userId).delete();

const update = async (userId, data) =>
  await db("users").where("userId", userId).update(data);

const totalUser = async () => {
  const result = await db("users").count("userId as count");
  return Number(result[0].count); // pastikan hasilnya number
};

// ROLE
const insertRole = async (data) => await db("user_role").insert(data);

module.exports = { login, insert, insertRole, getAll, del, update, totalUser };
