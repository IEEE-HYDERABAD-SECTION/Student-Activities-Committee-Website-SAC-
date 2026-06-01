#!/usr/bin/env node
// One-time importer: pull the 16 IEEE vTools event URLs into data/events/*.json.
// Run: `node scripts/import-vtools.mjs`
//
// vTools event pages render most of their data into OpenGraph + JSON-LD + a few
// labeled blocks ("Date/Time", "Location"). We pull what's reliable, leave the
// rest blank for human review, and never overwrite existing files.

import { writeFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "data", "events");

const VTOOLS_IDS = [
  "538749", "538758", "543114", "542323", "543092", "544231",
  "544227", "545319", "540800", "551721", "550507", "551713",
  "553626", "556350", "555848", "558549",
];

function slugify(s) {
  return String(s || "untitled")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function pickMeta($, selector, attr = "content") {
  const v = $(selector).attr(attr);
  return v ? v.trim() : "";
}

function extractDate($) {
  // 1) JSON-LD startDate is the most reliable
  let iso = "";
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).contents().text());
      const items = Array.isArray(data) ? data : [data];
      for (const it of items) {
        if (it && it.startDate && !iso) iso = it.startDate;
      }
    } catch {}
  });
  if (iso) return iso;

  // 2) Fallback: look for a "Date/Time" labeled row
  const dt = $('*:contains("Date/Time")').last().next().text().trim();
  return dt || "";
}

function extractVenue($) {
  let venue = "";
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).contents().text());
      const items = Array.isArray(data) ? data : [data];
      for (const it of items) {
        if (it && it.location) {
          if (typeof it.location === "string") venue ||= it.location;
          else if (it.location.name) venue ||= it.location.name;
          else if (it.location.address?.streetAddress) venue ||= it.location.address.streetAddress;
        }
      }
    } catch {}
  });
  return venue;
}

async function importOne(id) {
  const url = `https://events.vtools.ieee.org/m/${id}`;
  process.stdout.write(`→ ${id} ... `);
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);

    const title = pickMeta($, 'meta[property="og:title"]') || $("h1").first().text().trim() || `Event ${id}`;
    const description = pickMeta($, 'meta[property="og:description"]') || pickMeta($, 'meta[name="description"]');
    const poster = pickMeta($, 'meta[property="og:image"]');
    const date = extractDate($);
    const venue = extractVenue($);

    const slug = `${(date || "").slice(0, 4) || "2026"}-${slugify(title)}`;
    const outPath = path.join(OUT_DIR, `${slug}.json`);

    if (existsSync(outPath)) {
      console.log(`skipped (already exists: ${slug}.json)`);
      return;
    }

    const event = {
      title,
      slug,
      date,
      venue,
      mode: "in-person",
      poster: poster || "",
      description,
      register_url: url,
      vtools_id: id,
      featured: false,
      tags: [],
    };

    await writeFile(outPath, JSON.stringify(event, null, 2) + "\n", "utf8");
    console.log(`wrote ${slug}.json`);
  } catch (err) {
    console.log(`FAILED - ${err.message}`);
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Importing ${VTOOLS_IDS.length} vTools events into ${OUT_DIR}`);
  for (const id of VTOOLS_IDS) {
    await importOne(id);
    await new Promise((r) => setTimeout(r, 400)); // gentle rate-limit
  }
  console.log("\nDone. Review the generated files in data/events/ for accuracy before deploying.");
}

main();
