import h from "vhtml";
import { readFile } from "node:fs/promises";

/**
 * @param {import("node:fs").PathLike} path
 */
async function loadSvg(path) {
  let f = await readFile(path, "utf-8");
  return (props) => {
    let s = f;
    if (props.class) s = f.replace("<svg", `<svg class="${props.class}"`);
    return (
      <div
        class={props.containerClass}
        dangerouslySetInnerHTML={{ __html: s }}
      ></div>
    );
  };
}

const postcssImport = require("postcss-import");
const cssnano = require("cssnano");
const tailwindPlugin = require("tailwindcss")(require("../tailwind.config"));
const postcss = require("postcss")([
  postcssImport(),
  require("postcss-url")({ url: "rebase" }),
  tailwindPlugin,
  ...(process.env.ELEVENTY_ENV === "production" ? [cssnano()] : []),
]);

export async function render(data) {
  const Estrellita = await loadSvg("src/assets/estrellita.svg");
  const Wave = await loadSvg("src/assets/wave.svg");
  const Circulo = await loadSvg("src/assets/circulo.svg");
  const Cruces = await loadSvg("src/assets/cruces.svg");
  // console.debug(data);
  const WobbleVioleta = await loadSvg("src/assets/wobble violeta.svg");
  const CaritasFelices = await loadSvg("src/assets/caritas felices.svg");
  const LogoInline = await loadSvg("src/assets/logo inline.svg");
  const LogoGrande = await loadSvg("src/assets/logo grande.svg");
  const IconosLanding = await loadSvg("src/assets/iconos landing.svg");
  const css = await tailwind();
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
        <style dangerouslySetInnerHTML={{ __html: css }}></style>
      </head>
      <body class="flex flex-col font-sans">
        <nav class="sticky top-0 w-full bg-blanco px-16 py-4">
          <LogoInline class="h-12" />
        </nav>
        <section class="min-h-screen">
          <div class="grid h-full grid-cols-1 md:grid-cols-2">
            <div class="flex h-full min-h-[40vh] items-center justify-center bg-naranja p-8">
              <LogoGrande containerClass="flex-1 max-w-lg" class="w-100" />
            </div>
            <div class="flex flex-col bg-celeste px-[20%] py-[30%]">
              <IconosLanding class="w-64 max-w-full" />
              <h2 class="my-8 text-5xl">
                Hackeamos
                <br />
                la educación
                <br />
                digital
                <br />
                <strong>equitativa</strong>
              </h2>
              <Wave class="mt-4 w-32" />
            </div>
          </div>
        </section>
        <section class="min-h-screen bg-blanco">
          <WobbleVioleta />
          <div class="mx-auto w-32 pt-8">
            <CaritasFelices />
          </div>
          <div class="p-8">
            <h2 class="flex items-center justify-center gap-4 pb-8 text-5xl font-bold leading-none">
              <Estrellita class="h-[1em] w-[1em] shrink-0" />{" "}
              <span class="text-center">Nuevos saberes</span>{" "}
              <Estrellita class="h-[1em] w-[1em] shrink-0" />
            </h2>
            <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              {data.frontpageNuevosSaberes.map(
                ({ número, título, content }) => (
                  <div class="flex-1 border-l border-current px-6 py-6">
                    <h3 class="pb-4 font-mono text-2xl italic">{número}</h3>
                    <h3 class="pb-4 text-2xl font-bold">{título}</h3>
                    <p>{content}</p>
                  </div>
                )
              )}
            </div>
            <div class="mt-8 flex items-center justify-between">
              <Circulo class="h-6 h-full" />
              <div class="relative">
                <Cruces class="h-8" />
                <Cruces class="absolute top-0 h-8 -scale-y-100" />
              </div>
              <Circulo class="h-6 h-full" />
            </div>
          </div>
        </section>
        <section class="min-h-screen bg-blanco">
          <div class="mx-auto max-w-5xl p-2">
            <div class="mb-4 flex justify-center gap-4">
              <img
                class="aspect-[1.3] w-1/2"
                src="assets/img/imagen_naranja.webp"
              />
              <img
                class="aspect-[1.3] w-1/2"
                src="assets/img/imagen_violeta.webp"
              />
            </div>
            <div class="flex items-center gap-4">
              <Wave containerClass="mx-8" class="w-full" />
              <img
                class="mx-auto aspect-[1.94] w-8/12 object-contain"
                src="assets/img/imagen_celeste.webp"
              />
              <Wave containerClass="mx-8" class="w-full" />
            </div>
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
                      class={`aspect-square h-auto w-full max-w-[24rem] overflow-y-auto ${classes[color]}`}
                    ></div>
                    <div class="aspect-square h-auto w-full max-w-[24rem] overflow-y-auto p-8">
                      <h2 class="mb-4 text-4xl font-bold">{título}</h2>
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
            <h2 class="mb-4 mt-16 text-3xl leading-none">
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
            <p class="text-xl leading-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              labore repellat delectus aliquam soluta dolore officia consectetur
              ab quos quaerat, maiores earum molestiae assumenda, praesentium
              nemo commodi repellendus iusto dolorum!
            </p>
            <a
              class="border border-[white] bg-[black] p-3 text-xl font-bold uppercase leading-none"
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
          <div class="col-span-4 border-l border-gray-500 pl-4">
            <h2 class="py-2 text-xl font-semibold">Socios</h2>
            <div class="grid grid-cols-3">{fillerUdesa(6)}</div>
          </div>
          <div class="col-span-3 border-l border-gray-500 pl-4">
            <h2 class="py-2 text-xl font-semibold">Socios etec lab</h2>
            <div class="grid grid-cols-2">{fillerUdesa(4)}</div>
          </div>
          <div class="col-span-3 border-l border-gray-500 pl-4">
            <h2 class="py-2 text-xl font-semibold">Donantes</h2>
            <div class="grid grid-cols-2">{fillerUdesa(4)}</div>
          </div>
        </section>
        <section class="flex flex-wrap items-end justify-between gap-8 bg-violeta px-32 py-24">
          <LogoInline class="w-48" />
          <a class="text-xl" href="mailto:alfadatizando@gmail.com">
            alfadatizando@gmail.com
          </a>
        </section>
      </body>
    </html>
  );
}

function fillerUdesa(n) {
  return Array(n)
    .fill(0)
    .map(() => (
      <img
        class="grayscale"
        src="udesa.png"
        alt="logo de la universidad de san andrés"
      />
    ));
}

async function tailwind() {
  const from = "src/tailwind.css";
  const css = await postcss.process(await readFile(from, "utf-8"), { from });
  return css;
}
