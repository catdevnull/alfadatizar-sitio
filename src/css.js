import { readFile } from "node:fs/promises";

const postcssImport = require("postcss-import");
const cssnano = require("cssnano");
const tailwindPlugin = require("tailwindcss")(require("../tailwind.config"));
const postcss = require("postcss")([
  postcssImport(),
  require("postcss-url")({ url: "rebase" }),
  tailwindPlugin,
  ...(process.env.ELEVENTY_ENV === "production" ? [cssnano()] : []),
]);

export async function tailwind() {
  const from = "src/tailwind.css";
  const css = await postcss.process(await readFile(from, "utf-8"), { from });
  return css;
}
