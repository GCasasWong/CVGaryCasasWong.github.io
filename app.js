var menu_visible = false;
let menu = document.getElementById("nav");
function mostrarOcultarMenu() {
  if (menu_visible == false) {
    //si esta oculto
    menu.style.display = "block";
    menu_visible = true;
  } else {
    menu.style.display = "none";
    menu_visible = false;
  }
}
//oculto el menu una vez que selecciono una opción
let links = document.querySelectorAll("nav a");
for (var x = 0; x < links.length; x++) {
  //Oculta el menú lateral al seleccionar una opción de la nav
  links[x].onclick = function () {
    menu.style.display = "none";
    menu_visible = false;
  };
}

//Creo las barritas de una barra particular identificada por su id
function crearBarra(id_barra) {
  for (i = 0; i <= 16; i++) {
    let div = document.createElement("div");
    div.className = "e";
    id_barra.appendChild(div);
  }
}

//selecciono todas las barras generales par aluego manipularlas
let html = document.getElementById("html");
crearBarra(html);
let javascript = document.getElementById("javascript");
crearBarra(javascript);
let figma = document.getElementById("figma");
crearBarra(figma);
let React = document.getElementById("React");
crearBarra(React);
let Postgress = document.getElementById("Postgress");
crearBarra(Postgress);
let Bootstrap = document.getElementById("Bootstrap");
crearBarra(Bootstrap);
let metaAds = document.getElementById("metaAds");
if (metaAds) crearBarra(metaAds);
let playwright = document.getElementById("playwright");
if (playwright) crearBarra(playwright);

//Ahora voy a guardar la cantidad de barritas que se van a ir pintando por cada barar
//para eso utilizo un arreglo, cada posición pertenece a un elemento
//comienzan en -1 porque no tiene ninguna pintada al iniciarse
let contadores = [-1, -1, -1, -1, -1, -1, -1, -1];
//esta variable la voy a utilizar de bandera para saber si ya ejecuto la animación
let entro = false;

// Velocidad de animación (ms). Menor = más rápido.
const ANIMACION_INTERVALO_MS = 60;

// Porcentajes objetivo (deben coincidir con los % que se muestran en index.html)
const PORCENTAJES = {
  html: 95,
  javascript: 90,
  figma: 90,
  react: 90,
  seo: 90,
  tailwind: 90,
  metaAds: 90,
  playwright: 90,
};

// Convierte un porcentaje (0-100) en cantidad de "barritas" a pintar.
// Nota: crearBarra genera 17 segmentos (0..16), así que el máximo es 17.
function porcentajeACantidad(porcentaje) {
  const totalSegmentos = 17;
  const p = Math.max(0, Math.min(100, porcentaje));
  // Usamos ceil para que 90/95 se note bien (pinte un poco más vs round).
  return Math.ceil((p / 100) * totalSegmentos);
}

//función que aplica las animaciones de la habilidades
function efectoHabilidades() {
  var habilidades = document.getElementById("habilidades");
  if (!habilidades) return;

  var rect = habilidades.getBoundingClientRect();
  var elementoVisible = (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );

  if (elementoVisible) {
    if (entro == false) {
      entro = true;

      const intervalHtml = setInterval(function () {
        pintarBarra(html, porcentajeACantidad(PORCENTAJES.html), 0, intervalHtml);
      }, ANIMACION_INTERVALO_MS);
      const intervalJavascript = setInterval(function () {
        pintarBarra(
          javascript,
          porcentajeACantidad(PORCENTAJES.javascript),
          1,
          intervalJavascript
        );
      }, ANIMACION_INTERVALO_MS);
      const intervalFigma = setInterval(function () {
        pintarBarra(figma, porcentajeACantidad(PORCENTAJES.figma), 2, intervalFigma);
      }, ANIMACION_INTERVALO_MS);
      const intervalReact = setInterval(function () {
        pintarBarra(React, porcentajeACantidad(PORCENTAJES.react), 3, intervalReact);
      }, ANIMACION_INTERVALO_MS);
      const intervalSeo = setInterval(function () {
        pintarBarra(Postgress, porcentajeACantidad(PORCENTAJES.seo), 4, intervalSeo);
      }, ANIMACION_INTERVALO_MS);
      const intervalTailwind = setInterval(function () {
        pintarBarra(Bootstrap, porcentajeACantidad(PORCENTAJES.tailwind), 5, intervalTailwind);
      }, ANIMACION_INTERVALO_MS);

      if (metaAds) {
        const intervalMetaAds = setInterval(function () {
          pintarBarra(
            metaAds,
            porcentajeACantidad(PORCENTAJES.metaAds),
            6,
            intervalMetaAds
          );
        }, ANIMACION_INTERVALO_MS);
      }

      if (playwright) {
        const intervalPlaywright = setInterval(function () {
          pintarBarra(
            playwright,
            porcentajeACantidad(PORCENTAJES.playwright),
            7,
            intervalPlaywright
          );
        }, ANIMACION_INTERVALO_MS);
      }
    }
  } else {
    entro = false;
    contadores = [-1, -1, -1, -1, -1, -1, -1, -1];
    const elementos = document.getElementsByClassName("e");
    for (let elemento of elementos) {
      elemento.style.backgroundColor = "";
    }
  }
}

// Modificar el evento de scroll para mejor compatibilidad móvil
window.addEventListener("scroll", efectoHabilidades);
window.addEventListener("touchmove", efectoHabilidades);
window.addEventListener("load", efectoHabilidades);

//lleno una barra particular con la cantidad indicada
function pintarBarra(id_barra, cantidad, indice, interval) {
  contadores[indice]++;
  x = contadores[indice];
  if (x < cantidad) {
    let elementos = id_barra.getElementsByClassName("e");
    if (elementos[x]) {
      elementos[x].style.backgroundColor = "#940253";
    }
  } else {
    clearInterval(interval);
  }
}

//detecto el scrolling del mouse para aplicar la animación de la barra
window.onscroll = function () {
  efectoHabilidades();
};
