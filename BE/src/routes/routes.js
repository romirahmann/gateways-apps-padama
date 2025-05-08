var express = require("express");
var router = express.Router();
const path = require("path");

const masterRoutes = require("./master_routes/master.routes");
const authRoutes = require("./utility_routes/auth.routes");
const AppsController = require("../controllers/master_controller/AppsController");
const LogController = require("../controllers/master_controller/LogController");

const { accessControl, verifyToken } = require("../services/auth.service");

router.get("/error", function (req, res) {
  res.status(404).sendFile(path.join(__dirname, "../views/errorPage.html"));
});

router.use("/auth/", authRoutes);
router.use("/master/", accessControl, verifyToken, masterRoutes);
router.get("/data-apps/", AppsController.getAllApps);
router.post("/log", LogController.addLog);

module.exports = router;
