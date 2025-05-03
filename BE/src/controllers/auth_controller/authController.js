const argon2 = require("argon2");
const api = require("../../tools/common");
const { generateToken } = require("../../services/auth.service");
const logService = require("../../services/log.service");
const userModel = require("../../models/user.model");

// VERIFY PASSWORD
const verifyPassword = async (plainPassword, hashPassword) => {
  try {
    return await argon2.verify(hashPassword, plainPassword);
  } catch (err) {
    console.log(err);
    return false;
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return api.error(res, "Username or Password not Found!", 400);
    }

    const user = await userModel.login(username);

    if (!user) {
      return api.error(res, "User Not Found!", 400);
    }

    // console.log(user.password);
    const passwordIsMacth = await verifyPassword(password, user.password);
    // console.log(passwordIsMacth);

    if (!passwordIsMacth) {
      return api.error(res, "Incorrect Password!", 400);
    }

    const userData = {
      id: user.userId,
      username: user.username,
      roleId: user.roleId,
    };

    const token = generateToken(userData);
    return api.success(res, { token, userData });
  } catch (err) {
    return api.error(res, err, 500);
  }
};

module.exports = { login };
