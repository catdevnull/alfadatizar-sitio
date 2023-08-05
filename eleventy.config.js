/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.setServerOptions({
    watch: ["src/**/*.css"],
  });
  eleventyConfig.addWatchTarget("src/");
  eleventyConfig.addWatchTarget("tailwind.config.js");

  eleventyConfig.addShortcode("tailwind", async () => {
    const from = "src/tailwind.css";
    return await postcss.process(await readFile(from, "utf-8"), { from });
  });
  eleventyConfig.addPassthroughCopy("src/**/*.png");
  eleventyConfig.addPassthroughCopy("src/**/*.webp");
  eleventyConfig.addPassthroughCopy("src/**/*.woff");
  eleventyConfig.addPassthroughCopy("src/**/*.woff2");
  eleventyConfig.addPassthroughCopy("src/assets/img/**/*.svg");

  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
  });

  return {
    dir: {
      input: "src",
    },
  };
};
