const argon2 = require("argon2");
const api = require("../../tools/common");
const userModel = require("../../models/user.model");
const logService = require("../../services/log.service");

// HASH PASSWORD FUNCTION
const hashPassword = async (plainPassword) => {
  try {
    return await argon2.hash(plainPassword, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 4,
      parallelism: 2,
    });
  } catch (err) {
    return api.error(res, "Failed Hasing Password", 500);
  }
};

const register = async (req, res) => {
  let data = req.body;
  try {
    if (!data.username || !data.password || !data.roleId) {
      return api.error(res, "Data User Not Found!", 404);
    }
    data.password = await hashPassword(data.password);
    let result = await userModel.insert(data);
    return api.success(res, result);
  } catch (err) {
    return api.error(res, err, 500);
    // return api.error(res, "Failed to Add User", 500);
  }
};

const addUserRole = async (req, res) => {
  const data = req.body;
  try {
    // console.log(data);
    if (!data) return api.error(res, "Role Name Not Found!", 404);
    let result = await userModel.insertRole(data);
    return api.success(res, result);
  } catch (err) {
    return api.error(res, err, 500);
    // return api.error(res, "Failed To Add User Role", 500);
  }
};

module.exports = {
  register,
  addUserRole,
};
