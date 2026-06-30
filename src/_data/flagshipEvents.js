const fs = require("node:fs");
const path = require("node:path");

const FLAGSHIP_DIR = path.join(__dirname, "..", "..", "data", "flagship-events");

function loadAll() {
  if (!fs.existsSync(FLAGSHIP_DIR)) return [];

  return fs
    .readdirSync(FLAGSHIP_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const item = JSON.parse(fs.readFileSync(path.join(FLAGSHIP_DIR, file), "utf8"));
      item._filename = file;
      item.slug = item.slug || file.replace(/\.json$/, "");
      item.status = item.status || "active";
      item.order = Number.isFinite(Number(item.order)) ? Number(item.order) : 999;
      return item;
    });
}

module.exports = function () {
  const all = loadAll().sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return String(a.title || "").localeCompare(String(b.title || ""));
  });

  return {
    all,
    featured: all.filter((item) => item.featured),
    active: all.filter((item) => item.status !== "archived"),
    archived: all.filter((item) => item.status === "archived"),
  };
};
