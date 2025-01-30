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

//Ahora voy a guardar la cantidad de barritas que se van a ir pintando por cada barar
//para eso utilizo un arreglo, cada posiciòn pertenece a un elemento
//comienzan en -1 porque no tiene ninguna pintada al iniciarse
let contadores = [-1, -1, -1, -1, -1, -1];
//esta variable la voy a utilizar de bandera para saber si ya ejecuto la animación
let entro = false;

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
        pintarBarra(html, 15, 0, intervalHtml);
      }, 100);
      const intervalJavascript = setInterval(function () {
        pintarBarra(javascript, 15, 1, intervalJavascript);
      }, 100);
      const intervalfigma = setInterval(function () {
        pintarBarra(figma, 14, 2, intervalfigma);
      }, 100);
      const intervalReact = setInterval(function () {
        pintarBarra(React, 14, 3, intervalReact);
      }, 100);
      const intervalPostgress = setInterval(function () {
        pintarBarra(Postgress, 15, 4, intervalPostgress);
      }, 100);
      const intervalBootstrap = setInterval(function () {
        pintarBarra(Bootstrap, 15, 5, intervalBootstrap);
      }, 100);
    }
  } else {
    entro = false;
    contadores = [-1, -1, -1, -1, -1, -1];
    const elementos = document.getElementsByClassName("e");
    for (let elemento of elementos) {
      elemento.style.backgroundColor = "";
    }
  }
}

// Modificar el evento de scroll para mejor compatibilidad móvil
window.addEventListener('scroll', efectoHabilidades);
window.addEventListener('touchmove', efectoHabilidades);
window.addEventListener('load', efectoHabilidades);

//lleno una barra particular con la cantidad indicada
function pintarBarra(id_barra, cantidad, indice, interval) {
  contadores[indice]++;
  x = contadores[indice];
  if (x < cantidad) {
    let elementos = id_barra.getElementsByClassName("e");
    elementos[x].style.backgroundColor = "#940253";
  } else {
    clearInterval(interval);
  }
}

//detecto el scrolling del mouse para aplicar la animación de la barra
window.onscroll = function () {
  efectoHabilidades();
};
