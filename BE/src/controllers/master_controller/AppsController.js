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
      urlPadamaju: newData.urlPadamaju,
      urlPadaprima: newData.urlPadaprima,
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

const updateApp = async (req, res) => {
  let { appId } = req.params;
  let newData = req.body;
  let file = req.file;
  const io = getIo();

  try {
    if (!file) {
      let data = {
        appName: newData.appName,
        subName: newData.subName,
        urlPadamaju: newData.urlPadamaju,
        urlPadaprima: newData.urlPadaprima,
        port: newData.port,
      };

      io.emit("UPDATE_APP", {
        message: `Data aplikasi ${data.appName} berhasil diupdate!`,
      });

      let result = await appModel.update(appId, data);
      return api.success(res, result);
    }

    let data = {
      appName: newData.appName,
      subName: newData.subName,
      urlPadamaju: newData.urlPadamaju,
      urlPadaprima: newData.urlPadaprima,
      port: newData.port,
      icon: file.filename,
    };
    io.emit("UPDATE_APP", {
      message: `Data aplikasi ${data.appName} berhasil diupdate!`,
    });
    let result = await appModel.update(appId, data);
    return api.success(res, result);
  } catch (error) {
    console.log(error);
    return api.error(res, error, 500);
  }
};

const deleteApp = async (req, res) => {
  const { appId } = req.params;
  try {
    if (!appId) return api.error(res, "App Id not found!", 401);

    let dataApp = await appModel.getById(appId);

    const iconPath = path.join(__dirname, "../../uploads", dataApp.icon);
    // console.log(iconPath);
    if (fs.existsSync(iconPath)) {
      fs.unlinkSync(iconPath);
      console.log("Icon file deleted:", dataApp.icon);
    } else {
      console.log(fs.existsSync(iconPath), "file tidak terhapus!");
    }

    const io = getIo();
    io.emit("delete_app", {
      message: `Data aplikasi dengan ID ${appId} berhasil didelete!`,
    });

    let result = await appModel.del(appId);
    return api.success(res, result);
  } catch (err) {
    console.log(err);
    return api.error(res, "Failed to Delete Apps Data", 500);
  }
};

module.exports = {
  uploadFile,
  getFile,
  getAllApps,
  deleteApp,
  updateApp,
};
