// Loads roster JSON files from /data/team/. Each file is a year's roster
// with shape { year, title, description, members: [...] }.
// Exposes { sn: <latest>, core: <latest>, snYears: [...], coreYears: [...] }
// so the templates always reflect the most recent year automatically.

const fs = require("node:fs");
const path = require("node:path");

const TEAM_DIR = path.join(__dirname, "..", "..", "data", "team");

function loadYearly(prefix) {
  if (!fs.existsSync(TEAM_DIR)) return [];
  return fs
    .readdirSync(TEAM_DIR)
    .filter((f) => f.startsWith(prefix) && f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(TEAM_DIR, f), "utf8")))
    .sort((a, b) => (a.year < b.year ? 1 : -1));
}

module.exports = function () {
  const snYears = loadYearly("sn-");
  const coreYears = loadYearly("core-");
  return {
    sn: snYears[0] || { year: "", members: [] },
    core: coreYears[0] || { year: "", members: [] },
    snYears,
    coreYears,
  };
};
