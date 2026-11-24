module.exports = function (eleventyConfig) {
  // copy these to the output folder unchanged
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/theme.js");
  eleventyConfig.addPassthroughCopy("src/media");

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
