// Eleventy config — IEEE Hyderabad SAC site
// Input: src/  Output: _site/
// Pass-through copy preserves the existing repo layout (images, PDFs, legacy ID/ PHP folder, etc.)
// so deploys to GitHub Pages stay drop-in compatible while new pages migrate to Nunjucks templates.

module.exports = function (eleventyConfig) {
  // Static assets — copied verbatim into _site
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("data");
  eleventyConfig.addPassthroughCopy("ID");
  eleventyConfig.addPassthroughCopy("archive");
  eleventyConfig.addPassthroughCopy("resources");
  eleventyConfig.addPassthroughCopy("sheets");
  eleventyConfig.addPassthroughCopy("banner");
  eleventyConfig.addPassthroughCopy("ssc2021");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy(".htaccess");
  eleventyConfig.addPassthroughCopy("*.pdf");
  eleventyConfig.addPassthroughCopy("*.jpg");
  eleventyConfig.addPassthroughCopy("*.JPG");
  eleventyConfig.addPassthroughCopy("*.jpeg");
  eleventyConfig.addPassthroughCopy("*.png");
  eleventyConfig.addPassthroughCopy("*.gif");
  eleventyConfig.addPassthroughCopy("*.webp");
  eleventyConfig.addPassthroughCopy("*.xlsx");

  // Watch design system + data
  eleventyConfig.addWatchTarget("css/");
  eleventyConfig.addWatchTarget("js/");
  eleventyConfig.addWatchTarget("data/");

  // Date filter — display dates nicely from ISO strings
  eleventyConfig.addFilter("displayDate", (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  eleventyConfig.addFilter("displayTime", (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  });

  // Status helpers — derived, not stored, so editors can't get them wrong
  eleventyConfig.addFilter("isPast", (iso) => {
    if (!iso) return false;
    return new Date(iso).getTime() < Date.now();
  });

  // Slugify for stable URLs from titles
  eleventyConfig.addFilter("slug", (s) =>
    String(s)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
