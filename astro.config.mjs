// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

import cloudflare from "@astrojs/cloudflare";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), markdoc(), keystatic(), icon()],

  output: "hybrid",

  adapter: cloudflare({
    imageService: "compile",
  }),
  // https://github.com/Thinkmill/keystatic/issues/1229#issuecomment-2237793450
  vite: {
    define: { "process.env": process.env },
  },
});
