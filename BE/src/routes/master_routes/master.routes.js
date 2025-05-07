var express = require("express");
var router = express.Router();
const upload = require("../../services/upload.service");

const UserController = require("../../controllers/master_controller/UserController");
const AppsController = require("../../controllers/master_controller/AppsController");

// USER
router.post("/register", UserController.register);
router.post("/user-role", UserController.addUserRole);

// APPS
router.post("/upload", upload.single("file"), AppsController.uploadFile);
router.get("/image/:fileName", AppsController.getFile);
router.get("/apps", AppsController.getAllApps);
router.put("/app/:appId", upload.single("file"), AppsController.updateApp);
router.delete("/app/:appId", AppsController.deleteApp);

module.exports = router;
