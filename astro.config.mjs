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

  // TODO: temporal, hasta que keystatic entienda que podemos usar "static" en Astro 5 (porque es equivalente a "output: 'hybrid'" de antes)
  output: "hybrid",

  // experimental: {
  //   contentLayer: true,
  // },

  adapter: cloudflare({
    imageService: "compile",
  }),
  vite: {
    define: { "process.env": process.env },
  },
});
