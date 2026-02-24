module.exports = function(eleventyConfig) {
  // Pass through static assets without processing
  eleventyConfig.addPassthroughCopy({"images": "images"});
  eleventyConfig.addPassthroughCopy({"resources": "resources"});
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy({"CNAME": "CNAME"});
  eleventyConfig.addPassthroughCopy({".nojekyll": ".nojekyll"});

  // Blog collection - sorted by date
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByTag("blog").sort((a, b) => {
      return b.date - a.date; // newest first
    });
  });

  // Date filter for German formatting
  eleventyConfig.addFilter("date", function(dateObj, format) {
    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni",
                    "Juli", "August", "September", "Oktober", "November", "Dezember"];
    const d = new Date(dateObj);
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day}. ${month} ${year}`;
  });

  return {
    dir: {
      input: "src",
      output: "docs",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
