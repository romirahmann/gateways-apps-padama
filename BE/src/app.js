const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { init } = require("./services/socket.service");
const mainRoute = require("./routes/routes");

const app = express();
const server = createServer(app);
init(server);

// Middleware untuk log request
app.use((req, res, next) => {
  // console.log("Requested URL:", req.url);
  next();
});

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    service: "BACKEND GATEWAYS APP RUNNING",
  });
});

app.use("/api", mainRoute);

// 404 handle
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "ENDPOINT NOT FOUND!",
  });
});

module.exports = app;
