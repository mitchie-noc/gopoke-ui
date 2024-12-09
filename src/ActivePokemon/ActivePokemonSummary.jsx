import React from "react";
import PokemonTile from "../PokemonTiles/PokemonTile";
import ActivePokemonAbility from "./ActivePokemonAbility";
import ActivePokemonHeldItem from "./ActivePokemonHeldItem";
import ActivePokemonNature from "./ActivePokemonNature";

export default function ActivePokemonSummary({
  pokemon,
  nature,
  natures,
  onNatureSelected,
  onAbilitySelected,
  activeAbility,
}) {
  return (
    <div className="sm:w-1/3 w-full flex flex-col items-center sm:items-start border border-solid rounded-md">
      <div className="w-full flex flex-col items-center sm:items-start border border-solid rounded-md">
        <div className="grid grid-cols-2 gap-1 border border-solid rounded-md w-full">
          {/* Pokemon Tile */}
          <div className="flex justify-center items-center w-full h-full min-h-[150px]">
            <PokemonTile
              name={pokemon.Name}
              sprite={pokemon.Sprite}
              types={pokemon.Types}
              key={pokemon.Name}
            />
          </div>

          {/* Active Pokemon Ability */}
          <div className="w-full h-full min-h-[150px]">
            <ActivePokemonAbility
              abilities={pokemon.Abilities}
              onAbilitySelected={onAbilitySelected}
              activeAbility={activeAbility}
            />
          </div>

          {/* Active Pokemon Held Item */}
          <div className="w-full h-full min-h-[150px]">
            <ActivePokemonHeldItem />
          </div>

          {/* Active Pokemon Nature */}
          <div className="w-full h-full min-h-[150px]">
            <ActivePokemonNature
              natures={natures}
              nature={nature}
              onNatureSelected={onNatureSelected}
            />
          </div>
        </div>
      </div>

      <div>Junk</div>
    </div>
  );
}
