import React from "react";
import PokemonTypeTyle from "../PokemonTypes/PokemonTypeTile";
import "../index.css";

export default function PokemonTile({
  pokemon,
  name,
  sprite,
  types,
  pokemonTileClicked,
  className,
}) {
  let pokemonType = types.map((type) => (
    <PokemonTypeTyle type={type.Name} key={type.Name} width="w-full" />
  ));

  return (
    <div
      onClick={(event) => pokemonTileClicked(event, pokemon)}
      className={className}
    >
      <div className=" rounded-t-md bg-slate-900 w-full">
        <p className="font-mono font-bold text-3l text-center p-2 text-slate-50">
          {name.toUpperCase()}
        </p>
      </div>
      <img src={sprite} className="self-center bg-cyan-100" alt="sprite" />
      <div className="flex flex-row justify-between rounded-t-md bg-slate-800 w-full">
        {pokemonType}
      </div>
    </div>
  );
}
