import { file } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const cuadradosCollection = defineCollection({
  loader: file("src/data/frontpage-cuadrados.yaml"),
  schema: z.object({
    color: z.string(),
    título: z.string(),
    content: z.string(),
  }),
});

const footerButtonsCollection = defineCollection({
  loader: file("src/data/frontpage-footer-buttons.yaml"),
  schema: z.object({
    content: z.string(),
    buttonText: z.string(),
    buttonUrl: z.string(),
  }),
});

const nuevosSaberesCollection = defineCollection({
  loader: file("src/data/frontpage-nuevos-saberes.yaml"),
  schema: z.object({
    número: z.string(),
    título: z.string(),
    content: z.string(),
  }),
});

export const collections = {
  cuadrados: cuadradosCollection,
  footerButtons: footerButtonsCollection,
  nuevosSaberes: nuevosSaberesCollection,
};
