import React, { useMemo } from "react";
import { getHeroesByPublisher } from "../../selectors/getHeroesByPublisher";
import { HeroCard } from "./HeroCard";

// ?Lo ponemos con props de publisher, para poder reutilizar el component
export const HeroList = ({ publisher }) => {
  // ?Guardamos en memoria la lista de herores de ese publisher, y si
  // ?el publisher cambia, tenemos que llamar un nuevo memo y por ende
  // ?cambiar la lista de heroes
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);
  return (
    <div className="row rows-cols-1 row-cols-md-3 g-3 animate__animated animate__fadeIn animate__slow">
      {heroes.map((hero) => (
        // ?Necesario poner el key!
        // ?{...hero}esto significa que enviamos todas las cosas
        // ?que tenga el objeto, lo enviamos de manera destructuring
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  );
};
