const db = require("../database/db.config");

// USERS
const login = async (username) =>
  await db("users").where("username", username).first();
const insert = async (data) => await db("users").insert(data);

// ROLE
const insertRole = async (data) => await db("user_role").insert(data);

module.exports = { login, insert, insertRole };
