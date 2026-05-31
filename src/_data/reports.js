const fs = require("node:fs");
const path = require("node:path");

const DIR = path.join(__dirname, "..", "..", "data", "reports");

module.exports = function () {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};
