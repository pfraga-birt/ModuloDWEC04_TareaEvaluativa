import { RestauranteService } from "./services/restaurante.service.js";
import { DetallesService } from "./services/detalles.service.js";

("use strict");
let pagina = new URLSearchParams(window.location.search);

$(document).ready(function () {
  if (pagina.has("restaurante")) {
    let params = new URLSearchParams(window.location.search);
    let nombreRestaurante = params.get("restaurante");
    DetallesService.mostrarDetalles(nombreRestaurante);
  } else {
    RestauranteService.fetchRestaurantes();
  }
});

$("#btnAtras").click(function () {
  window.history.back();
});

$("#btn-filtrar").click(function () {
  let tipoFiltro = $("#select-tipo").val();
  let localidadFiltro = $("#select-localidad").val();
  RestauranteService.filtrarRestaurantes(tipoFiltro, localidadFiltro);
});

$("#btn-reset").click(function () {
  RestauranteService.resetFiltros();
});

$("#tienen-michellin").click(function () {
  RestauranteService.filtrarPorMichellin();
});

$("#tienen-bodega").click(function () {
  RestauranteService.filtrarPorBodega();
});
