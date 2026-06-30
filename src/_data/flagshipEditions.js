const fs = require("node:fs");
const path = require("node:path");

const EDITIONS_DIR = path.join(__dirname, "..", "..", "data", "flagship-editions");

function loadAll() {
  if (!fs.existsSync(EDITIONS_DIR)) return [];

  return fs
    .readdirSync(EDITIONS_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const edition = JSON.parse(fs.readFileSync(path.join(EDITIONS_DIR, file), "utf8"));
      edition._filename = file;
      edition.slug = edition.slug || file.replace(/\.json$/, "");
      return edition;
    });
}

module.exports = function () {
  const all = loadAll().sort((a, b) => {
    const yearDiff = Number(b.year || 0) - Number(a.year || 0);
    if (yearDiff) return yearDiff;
    return String(a.title || "").localeCompare(String(b.title || ""));
  });

  const byFlagship = all.reduce((acc, edition) => {
    if (!edition.flagship) return acc;
    acc[edition.flagship] = acc[edition.flagship] || [];
    acc[edition.flagship].push(edition);
    return acc;
  }, {});

  return { all, byFlagship };
};
