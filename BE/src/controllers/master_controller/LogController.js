const modelLog = require("../../models/log.model");
const api = require("../../tools/common");

const addLog = async (req, res) => {
  const data = req.body;
  try {
    if (!data) return api.error(res, "Invalid Data!", 401);

    let result = await modelLog.insert(data);
    return api.success(res, result);
  } catch (err) {
    console.log(err);
    return api.error(res, err, 500);
  }
};

module.exports = { addLog };
