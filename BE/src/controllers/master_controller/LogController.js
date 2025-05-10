const modelLog = require("../../models/log.model");
const { getIo } = require("../../services/socket.service");
const api = require("../../tools/common");

const getLogByDate = async (req, res) => {
  const { date } = req.params;
  try {
    if (!date) {
      let dateNow = moment().format("YYYY-MM-DD");
      let result = await modelLog.getByDate(dateNow);

      return api.success(res, result);
    }

    let result = await modelLog.getByDate(date);
    return api.success(res, result);
  } catch (err) {
    return api.error(res, err, 500);
  }
};
const addLog = async (req, res) => {
  const io = getIo();
  const data = req.body;
  try {
    if (!data) return api.error(res, "Invalid Data!", 401);

    let result = await modelLog.insert(data);

    io.emit("add_log", {
      message: `Data Log Bertambah!`,
    });

    return api.success(res, result);
  } catch (err) {
    console.log(err);
    return api.error(res, err, 500);
  }
};

module.exports = { addLog, getLogByDate };
