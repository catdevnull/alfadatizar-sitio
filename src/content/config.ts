// import { file, glob } from "astro/loaders";
import { z, defineCollection, reference } from "astro:content";

// const cuadradosCollection = defineCollection({
//   loader: file("src/data/frontpage-cuadrados.yaml"),
//   schema: z.object({
//     color: z.string(),
//     título: z.string(),
//     content: z.string(),
//   }),
// });

// const footerButtonsCollection = defineCollection({
//   loader: file("src/data/frontpage-footer-buttons.yaml"),
//   schema: z.object({
//     content: z.string(),
//     buttonText: z.string(),
//     buttonUrl: z.string(),
//   }),
// });

// const nuevosSaberesCollection = defineCollection({
//   loader: file("src/data/frontpage-nuevos-saberes.yaml"),
//   schema: z.object({
//     número: z.string(),
//     título: z.string(),
//     content: z.string(),
//   }),
// });

const authorsCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    rol: z.string(),
    bio: z.string().optional(),
    image: z.string().optional(),
    pronombres: z.enum(["masculino", "femenino", "neutro"]),
    twitter: z.string().optional(),
  }),
});

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: reference("authors"),
  }),
});

export const collections = {
  // cuadrados: cuadradosCollection,
  // footerButtons: footerButtonsCollection,
  // nuevosSaberes: nuevosSaberesCollection,
  posts: postsCollection,
  authors: authorsCollection,
};
