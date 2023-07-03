const postcssImport = require("postcss-import");
const cssnano = require("cssnano");
const tailwind = require("tailwindcss");
const tailwindConfig = require("./tailwind.config");
const { readFile } = require("fs/promises");
const tailwindPlugin = tailwind(tailwindConfig);
const postcss = require("postcss")([
  postcssImport(),
  tailwindPlugin,
  ...(process.env.ELEVENTY_ENV === "production" ? [cssnano()] : []),
]);

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.setServerOptions({
    watch: ["src/**/*.css"],
  });

  eleventyConfig.addShortcode("tailwind", async () => {
    const from = "src/tailwind.css";
    return await postcss.process(await readFile(from, "utf-8"), { from });
  });
  eleventyConfig.addPassthroughCopy("src/**.png");

  return {
    dir: {
      input: "src",
    },
  };
};
