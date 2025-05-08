var express = require("express");
var router = express.Router();

const AuthController = require("../../controllers/auth_controller/authController");

router.post("/login", AuthController.login);
router.get("/get-ip", AuthController.getIp);

module.exports = router;
