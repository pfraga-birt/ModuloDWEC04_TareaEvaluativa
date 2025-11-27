import { Restaurante } from "../models/restaurante.model.js";

function parsearRestaurantes(data) {
  let restaurantes = data.map(
    (restaurante) =>
      new Restaurante(
        restaurante.documentName,
        restaurante.documentDescription,
        restaurante.restorationType,
        restaurante.locality || "No disponible",
        restaurante.tourismEmail || "No disponible",
        restaurante.web || "No disponible",
        restaurante.capacity || 0,
        restaurante.michelinStar || 0,
        restaurante.marks,
        restaurante.territory,
        restaurante.bodega || 0,
        restaurante.latwgs84 || 0,
        restaurante.lonwgs84 || 0,
        restaurante.latitudelongitude
      )
  );
  return restaurantes;
}

export const RestauranteData = {
  parsearRestaurantes: parsearRestaurantes,
};
