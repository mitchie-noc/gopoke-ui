import React from "react";
import PokemonTile from "../PokemonTiles/PokemonTile";
import ActivePokemonAbility from "./ActivePokemonAbility";
import ActivePokemonHeldItem from "./ActivePokemonHeldItem";
import ActivePokemonNature from "./ActivePokemonNature";

export default function ActivePokemonSummary({ pokemonData, handlers }) {
  return (
    <div
      className={`sm:w-1/3 w-full h-full flex flex-col items-center sm:items-start`}
    >
      <div className="w-full flex flex-col items-center sm:items-start border border-solid rounded-md h-full">
        <div className="grid grid-cols-2 gap-1 border border-solid rounded-md w-full h-full">
          <div className="flex justify-center items-center w-full h-full">
            <PokemonTile
              name={pokemonData.pokemon.Name}
              sprite={pokemonData.pokemon.Sprite}
              types={pokemonData.pokemon.Types}
              key={pokemonData.pokemon.Name}
              className="border border-solid border-2 border-slate-50 rounded-md flex flex-col items-center justify-between w-full h-full bg-cyan-100"
            />
          </div>

          <div className="w-full h-full">
            <ActivePokemonNature
              natures={pokemonData.natures}
              nature={pokemonData.nature}
              onNatureSelected={handlers.onNatureSelected}
            />
          </div>

          <div className="w-full h-full">
            <ActivePokemonHeldItem
              items={pokemonData.items}
              onItemSelected={handlers.onItemSelected}
              activeItem={pokemonData.activeItem}
            />
          </div>

          <div className="w-full h-full">
            <ActivePokemonAbility
              abilities={pokemonData.pokemon.Abilities}
              onAbilitySelected={handlers.onAbilitySelected}
              activeAbility={pokemonData.activeAbility}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
