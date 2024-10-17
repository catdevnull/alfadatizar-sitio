import { config, fields, collection, singleton } from "@keystatic/core";

const cuadrado = () => ({
  título: fields.text({ label: "Título", validation: { isRequired: true } }),
  content: fields.text({ label: "Contenido", validation: { isRequired: true } }),
});
const footerButton = () => ({
  content: fields.text({ label: "Contenido", validation: { isRequired: true } }),
  buttonText: fields.text({ label: "Texto del botón", validation: { isRequired: true } }),
  buttonUrl: fields.url({ label: "URL del botón", validation: { isRequired: true } }),
});
const nuevosSaberes = () => ({
  número: fields.text({ label: "Número", validation: { isRequired: true } }),
  título: fields.text({ label: "Título", validation: { isRequired: true } }),
  content: fields.text({ label: "Contenido", validation: { isRequired: true } }),
});

export default config({
  storage:
    process.env.NODE_ENV === "production"
      ? {
          kind: "github",
          repo: {
            owner: "catdevnull",
            name: "alfadatizar-sitio",
          },
        }
      : { kind: "local" },
  singletons: {
    frontpageCuadrados: singleton({
      label: "Frontpage - Cuadrados",
      path: "src/data/frontpage-cuadrados",
      format: "json",
      schema: {
        celeste: fields.object(cuadrado(), { label: "Celeste" }),
        amarillo: fields.object(cuadrado(), { label: "Amarillo" }),
        naranja: fields.object(cuadrado(), { label: "Naranja" }),
        violeta: fields.object(cuadrado(), { label: "Violeta" }),
      },
    }),
    frontpageFooterButtons: singleton({
      label: "Frontpage - Footer Buttons",
      path: "src/data/frontpage-footer-buttons",
      format: "json",
      schema: {
        "01": fields.object(footerButton(), { label: "01" }),
        "02": fields.object(footerButton(), { label: "02" }),
        "03": fields.object(footerButton(), { label: "03" }),
        "04": fields.object(footerButton(), { label: "04" }),
      },
    }),
    frontpageNuevosSaberes: singleton({
      label: "Frontpage - Nuevos Saberes",
      path: "src/data/frontpage-nuevos-saberes",
      format: "json",
      schema: {
        "1": fields.object(nuevosSaberes(), { label: "01" }),
        "2": fields.object(nuevosSaberes(), { label: "02" }),
        "3": fields.object(nuevosSaberes(), { label: "03" }),
        "4": fields.object(nuevosSaberes(), { label: "04" }),
      },
    }),
    frontpageTeam: singleton({
      label: "Frontpage - Equipo",
      path: "src/data/frontpage-team",
      format: "json",
      schema: {
        personas: fields.array(fields.relationship({ label: "Persona", collection: "authors" }), {
          label: "Personas",
          itemLabel: ({ value }) => value!,
        }),
      },
    }),
  },
  collections: {
    authors: collection({
      label: "Authors",
      slugField: "name",
      path: "src/content/authors/*",
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        pronombres: fields.select({
          label: "Pronombres",
          options: [
            { label: "Masculino (el)", value: "masculino" },
            { label: "Femenino (ella)", value: "femenino" },
            { label: "Neutro (elle)", value: "neutro" },
          ],
          defaultValue: "neutro",
        }),
        rol: fields.text({ label: "Rol", validation: { isRequired: true } }),
        bio: fields.text({ label: "Bio" }),
        image: fields.image({
          label: "Image",
          directory: "src/assets/images/authors",
          publicPath: "/src/assets/images/authors",
          // TODO: no funciona en astro 5, no se que será
          // publicPath: "@assets/images/authors",
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
