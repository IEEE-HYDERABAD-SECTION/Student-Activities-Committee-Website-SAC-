const fs = require("node:fs");
const path = require("node:path");

const GALLERY_FILE = path.join(__dirname, "..", "..", "data", "gallery.json");

module.exports = function () {
  if (!fs.existsSync(GALLERY_FILE)) return [];
  const data = JSON.parse(fs.readFileSync(GALLERY_FILE, "utf8"));
  return data.groups || data;
};
