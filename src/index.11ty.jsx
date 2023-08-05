import h from "vhtml";
import { readFile } from "node:fs/promises";
import { tailwind } from "./css.js";

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

export async function render(data) {
  const Estrellita = await loadSvg("src/assets/estrellita.svg");
  const Wave = await loadSvg("src/assets/wave.svg");
  const VinculosPuntos = await loadSvg("src/assets/vinculos puntos.svg");
  const Circulo = await loadSvg("src/assets/circulo.svg");
  const Cruces = await loadSvg("src/assets/cruces.svg");
  // console.debug(data);
  const WobbleVioleta = await loadSvg("src/assets/wobble violeta.svg");
  const CaritasFelices = await loadSvg("src/assets/caritas felices.svg");
  const LogoInline = await loadSvg("src/assets/logo inline.svg");
  const LogoGrande = await loadSvg("src/assets/logo grande.svg");
  const IconosLanding = await loadSvg("src/assets/iconos landing.svg");
  const css = await tailwind();

  const CuadradoAlfabetizaciones = await loadSvg(
    "src/assets/cuadrados/alfabetizaciones.svg"
  );
  const CuadradoCaraDeLapiz = await loadSvg(
    "src/assets/cuadrados/cara de lapiz.svg"
  );
  const CuadradoDatos = await loadSvg("src/assets/cuadrados/datos.svg");
  const CuadradoEscuelas = await loadSvg("src/assets/cuadrados/escuelas.svg");

  const meta = {
    title: "Alfadatizar",
    url: "https://staging.alfadatiz.ar/",
    description:
      "Digitalizamos escuelas de contextos vulnerables con un modelo sustentable basado en el liderazgo directivo.",
  };

  return (
    "<!doctype html>" +
    (
      <html lang="es">
        <head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
          />

          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
          <link rel="icon" href={`${meta.url}assets/img/favicon.svg`} />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={meta.url} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta
            property="og:image"
            content={`${meta.url}assets/img/screenshot.png`}
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={meta.url} />
          <meta property="twitter:title" content={meta.title} />
          <meta property="twitter:description" content={meta.description} />
          <meta
            property="twitter:image"
            content={`${meta.url}assets/img/screenshot.png`}
          />

          <style dangerouslySetInnerHTML={{ __html: css }}></style>
        </head>
        <body class="flex flex-col font-sans">
          <div class="flex min-h-screen w-full flex-col items-stretch">
            <nav class="w-full bg-blanco px-16 py-4">
              <LogoInline class="h-12" />
            </nav>
            <section class="grid flex-1 grid-cols-1 md:grid-cols-2">
              <div class="flex min-h-[40vh] items-center justify-center bg-naranja p-[15%]">
                <LogoGrande
                  containerClass="flex-1 min-w-[25vw]"
                  class="w-100"
                />
              </div>
              <div class="flex flex-col justify-evenly bg-celeste px-[20%] py-[20%]">
                <IconosLanding class="w-3xl min-w-[20vw] md:max-w-[50%]" />
                <h2 class="my-[20%] text-[5vmax] leading-none md:my-[10%] md:text-[5vmin]">
                  Hackeamos
                  <br />
                  la educación
                  <br />
                  digital
                  <br />
                  <strong>equitativa</strong>
                </h2>
                <Wave class="mt-4 min-w-[12%] max-w-[40%] md:max-w-[20%]" />
              </div>
            </section>
          </div>
          <section class="bg-blanco">
            <WobbleVioleta />
            <div class="mx-auto w-full max-w-[12rem] pt-16">
              <CaritasFelices />
            </div>
            <div class="p-[10%] py-16">
              <h2 class="flex items-center justify-center gap-4 pb-8 text-5xl font-bold leading-none">
                <Estrellita class="h-[1em] w-[1em] shrink-0" />{" "}
                <span class="text-center">Nuevos saberes</span>{" "}
                <Estrellita class="h-[1em] w-[1em] shrink-0" />
              </h2>
              <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                {data.frontpageNuevosSaberes.map(
                  ({ número, título, content }) => (
                    <div class="flex-1 border-l border-current px-6 py-6">
                      <h3 class="pb-4 text-2xl italic">{número}</h3>
                      <h3 class="pb-4 text-2xl font-bold">{título}</h3>
                      <p>{content}</p>
                    </div>
                  )
                )}
              </div>
              <div class="mt-16 flex items-center justify-between">
                <Circulo class="h-6" />
                <div class="relative">
                  <Cruces class="h-8" />
                  <Cruces class="absolute top-0 h-8 -scale-y-100" />
                </div>
                <Circulo class="h-6" />
              </div>
            </div>
          </section>
          <section class="bg-blanco">
            <div class="mx-auto max-w-5xl p-2">
              <div class="mb-4 flex justify-center gap-4">
                <img
                  class="aspect-[1.3] w-1/2 object-contain"
                  src="assets/img/imagen_naranja.webp"
                  alt="un grupo de personas atendiendo una capacitación, sentadas alrededor de una mesa, con tablets en sus manos"
                  loading="lazy"
                />
                <img
                  class="aspect-[1.3] w-1/2 object-contain"
                  src="assets/img/imagen_violeta.webp"
                  alt="un robot siendo manipulado por manos de niñxs, usando una laptop"
                  loading="lazy"
                />
              </div>
              <div class="flex items-center gap-4">
                <Wave
                  containerClass="mx-8 shrink-[2] max-w-[10vw]"
                  class="w-full"
                />
                <img
                  class="mx-auto aspect-[1.94] w-8/12 flex-auto object-contain"
                  src="assets/img/imagen_celeste.webp"
                  alt="dos mujeres riendose mirando una tablet"
                  loading="lazy"
                />
                <Wave
                  containerClass="mx-8 shrink-[2] max-w-[10vw]"
                  class="w-full"
                />
              </div>
            </div>
            <VinculosPuntos class="m-16 mx-auto h-16" />
          </section>
          <section class="flex place-content-center bg-blanco">
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
                  const iconos = {
                    celeste: <CuadradoAlfabetizaciones class="w-32" />,
                    amarillo: <CuadradoCaraDeLapiz class="w-32" />,
                    naranja: <CuadradoDatos class="w-32" />,
                    violeta: <CuadradoEscuelas class="w-32" />,
                  };
                  return (
                    <div class="grid lg:grid-cols-2">
                      <div
                        class={`aspect-square h-auto w-full max-w-[24rem] ${classes[color]} flex items-center justify-center`}
                      >
                        {iconos[color]}
                      </div>
                      <div class="h-auto w-full max-w-[24rem] overflow-y-auto break-words p-8 lg:aspect-square">
                        <h2 class="mb-4 text-4xl font-bold">{título}</h2>
                        <p class="text-2xl leading-6">{content}</p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </section>
          <section class="flex min-h-screen items-center bg-[black] text-[white]">
            <div class="m-[10%] grid w-full grid-rows-1 items-end lg:grid-cols-4">
              <div class="col-span-3 flex h-full flex-col justify-end p-4">
                <h2 class="mb-4 mt-16 text-3xl leading-none">
                  <strong>Caso:</strong>
                  <br />
                  Nuestra Señora del Rosario
                </h2>
                <iframe
                  class="aspect-video w-full"
                  src="https://www.youtube-nocookie.com/embed/NsT30qGayP4"
                  loading="lazy"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
              <div class="flex flex-col items-start gap-4 p-4">
                <p class="text-xl leading-6">
                  Formamos a los docentes para enseñar clases híbridas,
                  alfabetizaciones aumentadas y pensamiento computacional
                  aplicado.
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
          <section class="grid grid-cols-1 gap-8 bg-blanco px-[10%] py-8 md:grid-cols-10">
            <div class="flex flex-col border-l border-gray-500 pl-4 md:col-span-4">
              <h2 class="py-2 text-xl font-semibold">
                Alianzas socioeducativas
              </h2>
              <div class="grid flex-1 grid-cols-2 place-content-evenly items-center gap-4">
                <a href="https://fdcsa.org.ar">
                  <img
                    loading="lazy"
                    src="assets/img/alianzas/fdcsa.png"
                    alt="Fundación por el desarrollo comunitario San Andrés"
                  />
                </a>
                <a href="https://udesa.edu.ar">
                  <img
                    loading="lazy"
                    src="assets/img/alianzas/udesa4.webp"
                    alt="Universidad de San Andrés"
                  />
                </a>
                <a
                  href="https://www.feyalegria.org/argentina/"
                  class="grid grid-cols-2 gap-2"
                >
                  <img
                    loading="lazy"
                    src="assets/img/alianzas/jesuitas.png"
                    alt="jesuitas"
                  />
                  <img
                    loading="lazy"
                    src="assets/img/alianzas/fe y alegria.png"
                    alt="fe y alegria"
                  />
                </a>
                <a href="https://www.obispado-si.org.ar/">
                  <img
                    loading="lazy"
                    src="assets/img/alianzas/diocesis de san isidro.png"
                    alt="diocesis de san isidro"
                  />
                </a>
              </div>
            </div>
            <div class="flex flex-col border-l border-gray-500 pl-4 md:col-span-3">
              <h2 class="py-2 text-xl font-semibold">Alianzas EdTech</h2>
              <div class="grid flex-1 grid-cols-2 place-content-evenly items-center gap-4">
                <a href="https://fidu.la/#gestion-academica">
                  <img
                    loading="lazy"
                    src="assets/img/alianzas/fidu.png"
                    alt="fidu"
                  />
                </a>
                <a href="https://edpuzzle.com/">
                  <img
                    loading="lazy"
                    src="assets/img/alianzas/edpuzzle.png"
                    alt="edpuzzle"
                  />
                </a>
                <a href="https://tintafresca.com.ar/schoology/">
                  <img
                    loading="lazy"
                    src="assets/img/alianzas/schoology-t.webp"
                    alt="schoology"
                  />
                </a>
                <a href="https://legamasterlatam.com">
                  <img
                    loading="lazy"
                    src="assets/img/alianzas/legamaster.png"
                    alt="legamaster"
                  />
                </a>
              </div>
            </div>
            <div class="flex flex-col gap-3 border-l border-gray-500 pl-4 md:col-span-3">
              {/* TODO: revisar */}
              <h2 class="py-2 text-xl font-semibold">Nos acompañan</h2>
              <div class="grid flex-1 grid-cols-2 place-content-evenly items-center gap-4">
                <a href="https://finneg.com/ar/">
                  <img
                    loading="lazy"
                    src="assets/img/alianzas/finnegans.png"
                    alt="Finnegans"
                  />
                </a>
                <a href="https://www.globant.com/es">
                  <img
                    loading="lazy"
                    src="assets/img/alianzas/globant.png"
                    alt="Globant"
                  />
                </a>
                <a href="https://www.mercadolibre.com.ar/">
                  <img
                    loading="lazy"
                    src="assets/img/alianzas/mercadolibre2.webp"
                    alt="MercadoLibre"
                  />
                </a>
                <a href="https://www.agd.com.ar/">
                  <img
                    loading="lazy"
                    src="assets/img/alianzas/agd.png"
                    alt="AGD"
                  />
                </a>
              </div>
            </div>
          </section>
          <section class="flex flex-wrap items-end justify-between gap-8 bg-violeta px-[10%] py-24">
            <LogoInline class="w-full max-w-[16rem]" />
            {/* TODO: activar mail */}
            <a class="text-xl" href="mailto:info@alfadatiz.ar">
              info@alfadatiz.ar
            </a>
          </section>
        </body>
      </html>
    )
  );
}
