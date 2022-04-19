import React from "react";
import { HeroList } from "../hero/HeroList";

export const LandingScreen = () => {
  return (
    <div>
      <h1>All Heroes</h1>
      <hr></hr>

      <HeroList publisher="/" />
    </div>
  );
};
