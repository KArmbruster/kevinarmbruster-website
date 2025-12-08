module.exports = function(eleventyConfig) {
  // Pass through static assets without processing
  eleventyConfig.addPassthroughCopy({"images": "images"});
  eleventyConfig.addPassthroughCopy({"resources": "resources"});
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy({"CNAME": "CNAME"});

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
