import React from "react";
import PokemonTile from "../PokemonTiles/PokemonTile";

export default function ActivePokemonSummary({ pokemon }) {
  return (
    <div className="sm:w-1/3 w-full flex flex-col items-center sm:items-start space-y-4 sm:space-y-0">
      <PokemonTile
        name={pokemon.Name}
        sprite={pokemon.Sprite}
        types={pokemon.Types}
        key={pokemon.Name}
      />

      <div className="w-full p-5 space-y-2 text-sm">
        <div>Ability: wowsa</div>
        <div>Held item: choice scarf</div>
        <div>Nature: Timid</div>
      </div>
    </div>
  );
}
