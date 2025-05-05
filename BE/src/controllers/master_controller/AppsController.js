const appModel = require("../../models/app.model");
const fs = require("fs");
const path = require("path");
const api = require("../../tools/common");
const { getIo } = require("../../services/socket.service");

const getAllApps = async (req, res) => {
  try {
    let result = await appModel.getAll();
    return api.success(res, result);
  } catch (error) {
    console.log(error);
    return api.error(res, "Faild Get All Data Apps", 500);
  }
};

const uploadFile = async (req, res) => {
  const newData = req.body;
  const file = req.file;
  try {
    if (!file) return api.error(res, "File Not Found!", 404);

    let data = {
      appName: newData.appName,
      subName: newData.subName,
      url: newData.url,
      port: newData.port,
      icon: file.filename,
    };

    const io = getIo();
    io.emit("add_app", {
      message: `Data aplikasi ${data.appName} berhasil ditambahkan!`,
    });

    let result = await appModel.insert(data);
    return api.success(res, result);
  } catch (err) {
    return api.error(res, err, 500);
  }
};

const getFile = async (req, res) => {
  const { fileName } = req.params;
  try {
    const filePath = path.join(__dirname, "../../upload", fileName);
    // console.log(filePath);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      return api.error(res, "File Not Found!", 404);
    }
  } catch (err) {
    console.log(err);
    return api.error(res, "Failed Get Image", 500);
  }
};

module.exports = {
  uploadFile,
  getFile,
  getAllApps,
};
