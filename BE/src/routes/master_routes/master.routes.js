var express = require("express");
var router = express.Router();
const upload = require("../../services/upload.service");

const UserController = require("../../controllers/master_controller/UserController");
const AppsController = require("../../controllers/master_controller/AppsController");
const LogController = require("../../controllers/master_controller/LogController");
const DashboardController = require("../../controllers/master_controller/DashboardController");

// USER
router.get("/users", UserController.getAllUser);
router.put("/user/:userId", UserController.updateUser);
router.post("/register", UserController.register);
router.post("/user-role", UserController.addUserRole);
router.delete("/user/:userId", UserController.deleteUser);

// APPS
router.post("/upload", upload.single("file"), AppsController.uploadFile);
router.get("/image/:fileName", AppsController.getFile);
router.get("/apps", AppsController.getAllApps);
router.put("/app/:appId", upload.single("file"), AppsController.updateApp);
router.delete("/app/:appId", AppsController.deleteApp);

// LOGS
router.get("/log-by-date/:date", LogController.getLogByDate);

// dashboard
router.get("/statistik", DashboardController.getStatistik);

module.exports = router;
