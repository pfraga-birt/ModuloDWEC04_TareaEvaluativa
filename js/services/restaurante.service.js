import { RestauranteData } from "../data/restaurante.data.js";

const API_URL =
  "https://opendata.euskadi.eus/contenidos/ds_recursos_turisticos/restaurantes_sidrerias_bodegas/opendata/restaurantes.json";
const contenedorRestaurantes = document.getElementById("restaurantes");
const selectTipo = $("#select-tipo");
const selectLocalidad = $("#select-localidad");
let restaurantes;

function fetchRestaurantes() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: API_URL,
      method: "GET",
      success: function (response) {
        resolve(response);
      },
      error: function (error) {
        reject(error);
      },
    });
  });
}

function crearCajaRestaurante(restaurante, index) {
  let caja = document.createElement("div");
  caja.classList.add("restaurante-caja");

  let nombre = document.createElement("h3");
  let info = document.createElement("p");
  nombre.textContent = index + 1 + ". " + restaurante.nombre;
  info.innerHTML =
    "<strong>Localidad: </strong>" +
    restaurante.localidad +
    "<br>" +
    "<strong>Tipo: </strong>" +
    restaurante.tipo +
    "<br>" +
    "<strong>Email: </strong>" +
    restaurante.email +
    "<br>" +
    "<strong>Estrellas Michellin: </strong>" +
    restaurante.numMichellin +
    "<br>" +
    "<strong>Número de Bodegas: </strong>" +
    restaurante.numBodega;
  caja.append(nombre);
  caja.append(info);

  caja.addEventListener("click", () => {
    window.location.href = `pages/detalles.html?restaurante=${restaurante.nombre}`;
  });

  return caja;
}

fetchRestaurantes()
  .then(function (response) {
    restaurantes = response;
    restaurantes = RestauranteData.parsearRestaurantes(restaurantes);
    restaurantes.forEach((restaurante, i) => {
      let cajaRestaurante = crearCajaRestaurante(restaurante, i);
      contenedorRestaurantes.append(cajaRestaurante);
    });
    rellenarSelects();
  })
  .catch(function (error) {
    console.log("Error al recibir los datos:", error);
  });

function filtrarRestaurantes(tipoFiltro, localidadFiltro) {
  if (tipoFiltro == "false") {
    tipoFiltro = null;
  }
  if (localidadFiltro == "false") {
    localidadFiltro = null;
  }
  let restaurantesFiltrados = restaurantes.filter((restaurante) => {
    if (tipoFiltro && localidadFiltro) {
      return (
        restaurante.tipo === tipoFiltro &&
        restaurante.localidad === localidadFiltro
      );
    } else if (tipoFiltro) {
      return restaurante.tipo === tipoFiltro;
    } else if (localidadFiltro) {
      return restaurante.localidad === localidadFiltro;
    } else {
      return true;
    }
  });

  contenedorRestaurantes.innerHTML = "";
  restaurantesFiltrados.forEach((restaurante, i) => {
    let cajaRestaurante = crearCajaRestaurante(restaurante, i);
    contenedorRestaurantes.append(cajaRestaurante);
  });
}

function filtrarPorMichellin() {
  let restaurantesFiltrados = restaurantes.filter(
    (restaurante) => restaurante.numMichellin > 0
  );
  contenedorRestaurantes.innerHTML = "";
  restaurantesFiltrados.forEach((restaurante, i) => {
    let cajaRestaurante = crearCajaRestaurante(restaurante, i);
    contenedorRestaurantes.append(cajaRestaurante);
  });
}

function filtrarPorBodega() {
  let restaurantesFiltrados = restaurantes.filter(
    (restaurante) => restaurante.numBodega > 0
  );
  contenedorRestaurantes.innerHTML = "";
  restaurantesFiltrados.forEach((restaurante, i) => {
    let cajaRestaurante = crearCajaRestaurante(restaurante, i);
    contenedorRestaurantes.append(cajaRestaurante);
  });
}

function resetFiltros() {
  contenedorRestaurantes.innerHTML = "";
  restaurantes.forEach((restaurante, i) => {
    let cajaRestaurante = crearCajaRestaurante(restaurante, i);
    contenedorRestaurantes.append(cajaRestaurante);
  });
  selectTipo.val("false");
  selectLocalidad.val("false");
}

function rellenarSelects() {
  // Crear listas de tipos y localidades únicas para que no se repitan en los selects
  let tiposUnicos = [...new Set(restaurantes.map((r) => r.tipo))];
  let localidadesUnicos = [...new Set(restaurantes.map((r) => r.localidad))];

  tiposUnicos.forEach((tipo) => {
    let option = document.createElement("option");
    option.value = tipo;
    option.text = tipo;
    selectTipo.append(option);
  });
  localidadesUnicos.forEach((localidad) => {
    let option = document.createElement("option");
    option.value = localidad;
    option.text = localidad;
    selectLocalidad.append(option);
  });
}

export const RestauranteService = {
  fetchRestaurantes: fetchRestaurantes,
  filtrarRestaurantes: filtrarRestaurantes,
  resetFiltros: resetFiltros,
  filtrarPorMichellin: filtrarPorMichellin,
  filtrarPorBodega: filtrarPorBodega,
};
