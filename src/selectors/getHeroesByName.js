import { useNavigate } from "react-router-dom";
import "../data/heroes";
import { heroes } from "../data/heroes";

export const getHeroesByName = (name = "") => {
  if (!name) {
    return [];
  }
  // ?primero pasamos la busqueda del usuario a minuscula, para que
  // ?no interfieran las mayusculas
  name = name.toLowerCase();
  // ?Si lo que envio el usuario se incluye en el nombre de cada superhero
  // ?lo agrega a la lista que se hace return
  return heroes.filter((hero) => hero.superhero.toLowerCase().includes(name));
};
