import React from "react";
import { HeroList } from "../hero/HeroList";

export const MarvelScreen = () => {
  return (
    <>
      <h1>MarvelScreen</h1>
      <hr></hr>

      <HeroList publisher="Marvel Comics" />
    </>
  );
};
