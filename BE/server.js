require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 3004;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server Backend is Running on ${HOST}:${PORT}`);
});
