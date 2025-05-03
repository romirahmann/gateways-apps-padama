const fs = require("fs");
const moment = require("moment");
const path = require("path");

class Logger {
  constructor(logFileName = "../log/app.log") {
    this.logFilePath = path.join(__dirname, logFileName);
  }

  log(message = "[]", level = "SUCCESSFULLY") {
    const logMessage = `[${level}]-[${moment().format(
      "DD-MM-YYYY"
    )}] ${message}\n`;

    fs.appendFile(this.logFilePath, logMessage, (err) => {
      if (err) console.error("Error writing log: ", err);
    });
  }
}

module.exports = new Logger();
