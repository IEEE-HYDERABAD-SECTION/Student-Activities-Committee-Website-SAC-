const fs = require("node:fs");
const path = require("node:path");

module.exports = function () {
  const p = path.join(__dirname, "..", "..", "data", "nav.json");
  return JSON.parse(fs.readFileSync(p, "utf8"));
};
