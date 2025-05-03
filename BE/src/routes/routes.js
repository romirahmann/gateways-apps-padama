var express = require("express");
var router = express.Router();
const path = require("path");

const masterRoutes = require("./master_routes/master.routes");
const authRoutes = require("./utility_routes/auth.routes");

const { accessControl, verifyToken } = require("../services/auth.service");

router.get("/error", function (req, res) {
  res.status(404).sendFile(path.join(__dirname, "../views/errorPage.html"));
});

router.use("/auth/", authRoutes);
router.use("/master/", accessControl, verifyToken, masterRoutes);

module.exports = router;
