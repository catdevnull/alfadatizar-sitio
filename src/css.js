import { readFile } from "node:fs/promises";

import postcssS from "postcss";
import postcssImport from "postcss-import";
import postcssUrl from "postcss-url";
import cssnano from "cssnano";
import tailwindcss from "tailwindcss";
import tailwindConfig from "../tailwind.config.js";
const tailwindPlugin = tailwindcss(tailwindConfig);
const postcss = postcssS([
  postcssImport(),
  postcssUrl({ url: "rebase" }),
  tailwindPlugin,
  ...(process.env.PROD ? [cssnano()] : []),
]);

export async function tailwind() {
  const from = "src/tailwind.css";
  const css = await postcss.process(await readFile(from, "utf-8"), { from });
  return css;
}
