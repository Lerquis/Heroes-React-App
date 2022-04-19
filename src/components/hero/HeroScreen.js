import React, { useMemo } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { getHeroById } from "../../selectors/getHeroById";

export const HeroScreen = () => {
  // ?useParams nos sirve para leer la url
  // ?Extraemos mediante el destructuring el heroId pasado por la url
  const { heroId } = useParams();
  const navigate = useNavigate();
  // ?Extraemos el hero
  // ?Ponemos un memo, por si el usuario se vuelve a meter al mismo
  // ?heroe, entonces sabemos que ocupa la funcion para sacar los
  // ?datos del heroe, y de segundo parametro, la dependencia, es
  // ?decir, si cambia el heroId al anterior, debemos de extaer
  // ?el nuevo hero
  const hero = useMemo(() => {
    return getHeroById(heroId);
  }, [heroId]);

  // ?Si la url, tiene el id de un hero que no existe
  if (!hero) {
    // ?Nos devuleve un componente que nos redirecciona a la pagina
    // ?inicial
    return <Navigate to="/" />;
  }
  const handleReturn = () => {
    // ?Esto nos devuelve a la pagina anterior
    navigate(-1);
  };
  const imgPath = `/assets/heroes/${heroId}.jpg`;
  return (
    <div className="row mt-5">
      <div className="col-4 animate__animated animate__fadeInLeft">
        <img src={imgPath} alt={hero.superhero} className="img-thumbnail" />
      </div>
      <div className="col-8 animate__animated animate__fadeInRight">
        <h3>{hero.superhero}</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <b>Alter Ego: </b>
            {hero.alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher: </b>
            {hero.publisher}
          </li>
          <li className="list-group-item">
            <b>First Appearance: </b>
            {hero.first_appearance}
          </li>
        </ul>

        <h5 className="mt-5">Characters</h5>
        <p>{hero.characters}</p>

        <button className="btn btn-outline-info" onClick={handleReturn}>
          Go Back
        </button>
      </div>
    </div>
  );
};
