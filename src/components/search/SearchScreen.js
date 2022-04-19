import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { getHeroesByName } from "../../selectors/getHeroesByName";
import { HeroCard } from "../hero/HeroCard";
import queryString from "query-string";

export const SearchScreen = () => {
  // ?Para navegar a otra pagina
  const navigate = useNavigate();
  // ?Importante el location porque este tiene el contenido de la url
  const location = useLocation();

  // ?Importamos una libreria que nos facilita ver la url y saber
  // ?las cosas que busca el usuario, no importa que tan grande sea la
  // ?url, siempre la divide en partes de busqueda
  // ?Hacemos destructuring, ya que la url nos da nuestro dato de
  // ?busqueda en un objeto donde se almacena 'q'
  const { q = "" } = queryString.parse(location.search);

  // ?Agregamos nuestro hook para manejar el formulario
  const [{ searchText }, handleInputChange, reset] = useForm({
    // ?De default le damos el valor que tiene q
    searchText: q,
  });

  // ?Obtenemos los resultados mediante esta funcion, donde de
  // ?parametro le enviamos la busqueda del usuario
  // ?lo hacemos en un useMemo, ya que este cada que se escribe
  // ?renderiza el componente, y por ende no es tan eficiente
  // ?en un use memo, manda la funcion cuando cambie 'q'
  const listaResultados = useMemo(() => getHeroesByName(q), [q]);

  // ?Cuando se le de al boton de submit
  const handleSearch = (e) => {
    // ?prevenimos que se recargue la pagina
    e.preventDefault();

    // ?Lo enviamos a la pagina con los resultados
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Search for a hero!</h1>
      <hr></hr>

      <div className="row">
        <div className="col-5">
          <form
            onSubmit={(e) => {
              handleSearch(e);
            }}
          >
            <input
              type="text"
              onChange={handleInputChange}
              placeholder="Search for a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
            />

            <button type="submit" className="btn btn-outline-primary mt-3">
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Resultados</h4>
          <hr></hr>

          {/*
          La sintaxis de abajo quiere decir que si no hay busqueda, muestre 
          un div que diga que busca un hero. Sino, si el length de
          los resultados es 0 y hay busqueda muestre un div diciendo
          que no hay resultados*/}
          {q === "" ? (
            <div className="alert alert-info">Search a hero!!</div>
          ) : (
            listaResultados.length === 0 && (
              <div className="alert alert-danger">
                No hay resultados para: {q}
              </div>
            )
          )}

          {listaResultados.map((hero) => {
            return <HeroCard key={hero.id} {...hero} />;
          })}
        </div>
      </div>
    </>
  );
};
