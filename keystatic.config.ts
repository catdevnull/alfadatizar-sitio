import { config, fields, collection } from "@keystatic/core";

export default config({
  storage:
    process.env.NODE_ENV === "development"
      ? {
          kind: "local",
        }
      : {
          kind: "github",
          repo: "catdevnull/alfadatizar-sitio",
        },
  collections: {
    authors: collection({
      label: "Authors",
      slugField: "name",
      path: "src/content/authors/*",
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        bio: fields.text({ label: "Bio" }),
        image: fields.image({
          label: "Image",
          directory: "src/assets/images/authors",
          publicPath: "../../assets/images/authors",
          // TODO: no funciona en astro 5, no se que será
          // publicPath: "@assets/images/authors",
        }),
        pronombres: fields.select({
          label: "Pronombres",
          options: [
            { label: "Masculino (el)", value: "masculino" },
            { label: "Femenino (ella)", value: "femenino" },
            { label: "Neutro (elle)", value: "neutro" },
          ],
          defaultValue: "neutro",
        }),
        twitter: fields.text({ label: "Twitter", description: "Twitter handle without the @ symbol" }),
      },
    }),
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.markdoc({ label: "Content" }),
        date: fields.date({ label: "Date", defaultValue: { kind: "today" }, validation: { isRequired: true } }),
        author: fields.relationship({ collection: "authors", label: "Author", validation: { isRequired: true } }),
      },
    }),
  },
});
