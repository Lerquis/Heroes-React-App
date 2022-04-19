import { heroes } from "../data/heroes";

export const getHeroesByPublisher = (publisher) => {
  if (publisher === "/") return heroes.map((hero) => hero);
  const validPublishers = ["DC Comics", "Marvel Comics"];
  // ?Si el publisher no se encuentra en los publisher validos

  if (!validPublishers.includes(publisher)) {
    // ?Tire un error
    throw new Error(`${publisher} is not a valid publisher`);
  }
  return heroes.filter((hero) => hero.publisher === publisher);
};
