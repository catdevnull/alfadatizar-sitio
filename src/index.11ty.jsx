import h from "vhtml";

const postcssImport = require("postcss-import");
const cssnano = require("cssnano");
const { readFile } = require("fs/promises");
const tailwindPlugin = require("tailwindcss")(require("../tailwind.config"));
const postcss = require("postcss")([
  postcssImport(),
  tailwindPlugin,
  ...(process.env.ELEVENTY_ENV === "production" ? [cssnano()] : []),
]);

export async function render(data) {
  console.debug(data);
  //TODO: doctype
  return (
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <title>Alfadatizando</title>
        <style>{await tailwind()}</style>
      </head>
      <body>
        <nav class="sticky top-0 w-full bg-blanco px-16 py-4">asdf</nav>
        <section class="h-screen">
          <div class="flex h-full">
            <div class="h-full flex-1 bg-naranja">asdf</div>
            <div class="h-full flex-1 bg-celeste">asd</div>
          </div>
        </section>
        <section class="min-h-screen bg-blanco p-32">
          <div class="mb-4 flex justify-center gap-4">
            <img class="aspect-[1.3] w-1/3" src="tmp_imagen_roja.png" />
            <img class="aspect-[1.3] w-1/3" src="tmp_imagen_violeta.png" />
          </div>
          <img
            class="mx-auto aspect-[1.94] w-5/12 object-contain"
            src="tmp_imagen_azul.png"
          />
        </section>
        <section class="min-h-screen bg-blanco p-8">
          <h2 class="pb-8 text-center text-5xl font-bold">Nuevos saberes</h2>
          <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {data.frontpageNuevosSaberes.map(({ número, título, content }) => (
              <div class="border-current flex-1 border-l px-6 py-6">
                <h3 class="pb-4 font-mono text-2xl italic">{número}</h3>
                <h3 class="pb-4 text-2xl font-bold">{título}</h3>
                <p>{content}</p>
              </div>
            ))}
          </div>
        </section>
        <section class="flex min-h-screen place-content-center bg-blanco">
          <div class="grid grid-cols-1 place-content-center xl:grid-cols-2">
            {Object.entries(data.frontpageCuadrados).map(
              ([color, { título, content }]) => {
                // ¿por qué así en vez de `bg-${color}`? para que lo detecte tailwind.
                const classes = {
                  celeste: "bg-celeste",
                  amarillo: "bg-amarillo lg:order-last xl:order-none",
                  naranja: "bg-naranja xl:order-last",
                  violeta: "bg-violeta lg:order-last",
                };
                return (
                  <div class="grid lg:grid-cols-2">
                    <div
                      class={`aspect-square h-auto w-full max-w-[24rem] overflow-y-scroll ${classes[color]}`}
                    ></div>
                    <div class="aspect-square h-auto w-full max-w-[24rem] overflow-y-scroll p-8">
                      <h2 class="mb-4 text-4xl">{título}</h2>
                      <p>{content}</p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>
        <section class="grid min-h-screen grid-rows-1 items-end bg-[black] text-[white] lg:grid-cols-4">
          <div class="col-span-3 flex h-full flex-col justify-end p-4">
            <h2 class="mb-4 mt-16 font-mono text-3xl">
              <strong>Caso:</strong>
              <br />
              Nuestra Señora del Rosario
            </h2>
            <iframe
              class="aspect-video w-full"
              src="https://www.youtube-nocookie.com/embed/NsT30qGayP4"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div class="flex flex-col items-start gap-4 p-4">
            <p class="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              labore repellat delectus aliquam soluta dolore officia consectetur
              ab quos quaerat, maiores earum molestiae assumenda, praesentium
              nemo commodi repellendus iusto dolorum!
            </p>
            <a
              class="border border-[white] bg-[black] p-3 font-mono text-xl font-bold uppercase"
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/watch?v=NsT30qGayP4"
            >
              VER +
            </a>
          </div>
        </section>
        <section class="grid w-full grid-cols-2 justify-center gap-[1px] gap-y-6 bg-amarillo px-[10%] py-12 md:grid-cols-4">
          {data.frontpageFooterButtons.map(
            ({ content, buttonText, buttonUrl }) => (
              <div class="flex flex-col justify-end">
                <h2 class="px-3 pb-4 text-xl">{content}</h2>
                <a
                  href={buttonUrl}
                  class="px-4 py-3 font-bold outline outline-1 outline-[black]"
                >
                  {buttonText}
                </a>
              </div>
            )
          )}
        </section>
        <section class="grid grid-cols-10 gap-8 bg-blanco px-[10%] py-8">
          <div class="border-gray-500 col-span-4 border-l pl-4">
            <h2 class="py-2 text-xl font-semibold">Socios</h2>
            <div class="grid grid-cols-3">
              {Array(6)
                .fill(0)
                .map(() => (
                  <img
                    class="grayscale"
                    src="udesa.png"
                    alt="logo de la universidad de san andrés"
                  />
                ))}
            </div>
          </div>
          <div class="border-gray-500 col-span-3 border-l pl-4">
            <h2 class="py-2 text-xl font-semibold">Socios etec lab</h2>
            <div class="grid grid-cols-2">
              {Array(4)
                .fill(0)
                .map(() => (
                  <img
                    class="grayscale"
                    src="udesa.png"
                    alt="logo de la universidad de san andrés"
                  />
                ))}
            </div>
          </div>
          <div class="border-gray-500 col-span-3 border-l pl-4">
            <h2 class="py-2 text-xl font-semibold">Donantes</h2>
            <div class="grid grid-cols-2">
              {Array(4)
                .fill(0)
                .map(() => (
                  <img
                    class="grayscale"
                    src="udesa.png"
                    alt="logo de la universidad de san andrés"
                  />
                ))}
            </div>
          </div>
        </section>
        <section class="flex flex-wrap justify-between gap-8 bg-violeta px-32 py-24">
          <p class="text-3xl">TODO: logo</p>
          <a class="text-xl" href="mailto:alfadatizando@gmail.com">
            alfadatizando@gmail.com
          </a>
        </section>
      </body>
    </html>
  );
}

async function tailwind() {
  const from = "src/tailwind.css";
  return await postcss.process(await readFile(from, "utf-8"), { from });
}
