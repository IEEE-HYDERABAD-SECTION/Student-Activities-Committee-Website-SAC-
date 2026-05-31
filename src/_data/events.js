// Loads every JSON file in /data/events/ into a unified, sorted collection.
// Each event JSON file is one entry (the CMS-friendly shape). We:
//   - derive `status` from date vs today (single source of truth)
//   - sort upcoming chronologically; past in reverse-chronological
//   - expose `.upcoming`, `.past`, and `.featured` for templates.

const fs = require("node:fs");
const path = require("node:path");

const EVENTS_DIR = path.join(__dirname, "..", "..", "data", "events");

function loadAll() {
  if (!fs.existsSync(EVENTS_DIR)) return [];
  return fs
    .readdirSync(EVENTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(EVENTS_DIR, f), "utf8");
      const e = JSON.parse(raw);
      e._filename = f;
      e.slug = e.slug || f.replace(/\.json$/, "");
      // No date = treat as past (editor can set a future date in CMS to make it upcoming)
      if (!e.date) {
        e.status = "past";
      } else {
        e.status = new Date(e.date) < new Date() ? "past" : "upcoming";
      }
      return e;
    });
}

module.exports = function () {
  const all = loadAll();
  const upcoming = all
    .filter((e) => e.status === "upcoming")
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const past = all
    .filter((e) => e.status === "past")
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const featured = all.find((e) => e.featured) || upcoming[0] || null;

  return { all, upcoming, past, featured };
};
