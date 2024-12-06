import React from "react";
import PokemonTile from "../PokemonTiles/PokemonTile";
import "../index.css";

export default function ActivePokemon({ pokemon }) {
  const pok = pokemon[0];
  return (
    <PokemonTile
      name={pok.Name}
      sprite={pok.Sprite}
      types={pok.Types}
      key={pok.Name}
    />
  );
}
