const modelApp = require("../../models/app.model");
const modelUser = require("../../models/user.model");
const { getIo } = require("../../services/socket.service");
const api = require("../../tools/common");

const getStatistik = async (req, res) => {
  try {
    const io = getIo();
    io.emit("add_statistik", {
      message: `Data statistik berubah!`,
    });

    const [totalApp, totalUser] = await Promise.all([
      modelApp.totalApp(),
      modelUser.totalUser(),
    ]);

    return api.success(res, { totalApp, totalUser });
  } catch (err) {
    console.log(err);
    return api.error(res, err, 500);
  }
};

module.exports = { getStatistik };
