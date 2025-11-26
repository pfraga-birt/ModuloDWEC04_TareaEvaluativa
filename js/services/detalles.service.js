"use strict";
import { RestauranteData } from "../data/restaurante.data.js";
const detallesContainer = document.getElementById("detalle-restaurante");
const API_URL =
  "https://opendata.euskadi.eus/contenidos/ds_recursos_turisticos/restaurantes_sidrerias_bodegas/opendata/restaurantes.json";
let restaurantes;

function obtenerRestaurantes() {
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

function obtenerDetallesRestaurante(nombre) {
  return restaurantes.find((restaurante) => restaurante.nombre === nombre);
}

function mostrarDetalles(nombre) {
  let restaurante;
  obtenerRestaurantes()
    .then((response) => {
      restaurantes = RestauranteData.parsearRestaurantes(response);
      restaurante = obtenerDetallesRestaurante(nombre);
    })
    .then(() => {
      if (!restaurante) {
        console.log("Restaurante no encontrado");
        return;
      }
      let titutlo = document.createElement("h3");
      titutlo.textContent = "Información relevante";
      titutlo.classList.add("titulos-detalle");
      let nombreElem = document.createElement("h1");
      nombreElem.textContent = restaurante.nombre;
      let info = document.createElement("p");
      info.innerHTML =
        "<strong>Descripción: </strong>" +
        restaurante.descripcion +
        "<br>" +
        "<strong>Tipo: </strong>" +
        restaurante.tipo +
        "<br>" +
        "<strong>Localidad: </strong>" +
        restaurante.localidad +
        "<br>" +
        "<strong>Email: </strong>" +
        restaurante.email +
        "<br>" +
        "<strong>Web: </strong>" +
        restaurante.web +
        "<br>" +
        "<strong>Capacidad: </strong>" +
        restaurante.capacidad +
        "<br>" +
        "<strong>Número de Estrellas Michelin: </strong>" +
        restaurante.numMichellin +
        "<br>" +
        "<strong>Marca: </strong>" +
        restaurante.marca +
        "<br>" +
        "<strong>Territorio: </strong>" +
        restaurante.territorio +
        "<br>" +
        "<strong>Número de Bodegas: </strong>" +
        restaurante.numBodega;

      detallesContainer.appendChild(nombreElem);
      detallesContainer.appendChild(titutlo);
      detallesContainer.appendChild(info);

      crearMapa(restaurante);
    });
}

function crearMapa(restaurante) {
  let longitud = restaurante.longitud;
  let latitud = restaurante.latitud;

  let mapa = L.map("mapa").setView([latitud, longitud], 16);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa);

  L.marker([latitud, longitud])
    .addTo(mapa)
    .bindPopup(restaurante.nombre)
    .openPopup();
}

export const DetallesService = {
  mostrarDetalles: mostrarDetalles,
};
