const moment = require("moment");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const randomName = Math.random().toString(36).substring(2, 12);
    cb(null, `${randomName}${ext}`);
  },
});

function fileFilter(rreq, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only images jpg & png"), false);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
