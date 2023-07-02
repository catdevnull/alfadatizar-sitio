module.exports = function (eleventyConfig) {
  eleventyConfig.setServerOptions({
    watch: ["_site/**/*.css"],
  });

  eleventyConfig.addPassthroughCopy("**.png");

  return {
    dir: {
      input: "src",
    },
  };
};
