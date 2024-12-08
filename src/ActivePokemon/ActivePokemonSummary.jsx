import React from "react";
import PokemonTile from "../PokemonTiles/PokemonTile";

export default function ActivePokemonSummary({ pokemon }) {
  return (
    <div className="sm:w-1/3 w-full flex flex-row items-center sm:items-start border border-solid rounded-md">
      <div className="flex-1 flex justify-center items-center">
        <PokemonTile
          name={pokemon.Name}
          sprite={pokemon.Sprite}
          types={pokemon.Types}
          key={pokemon.Name}
        />
      </div>

      {/* Details - takes the other half of the width */}
      <div className="flex-1 w-full p-5 space-y-2 text-sm">
        <div>Ability: wowsa</div>
        <div>Held item: choice scarf</div>
        <div>Nature: Timid</div>
      </div>
    </div>
  );
}
