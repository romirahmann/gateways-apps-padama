const appModel = require("../../models/app.model");
const fs = require("fs");
const path = require("path");
const api = require("../../tools/common");

const uploadFile = async (req, res) => {
  const file = req.file;
  try {
    if (!file) return api.error(res, "File Not Found!", 404);

    let data = {
      appName: "",
      url: file.path,
      port: 0,
      icon: file.filename,
    };

    console.log(data);
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
};
