import React from "react";

import "../index.css";

export default function PokemonTile({
  pokemon,
  name,
  sprite,
  types,
  pokemonTileClicked,
  className,
}) {
  const colorMap = {
    grass: "bg-green-400",
    poison: "bg-violet-400",
    fire: "bg-red-400",
    flying: "bg-sky-400",
    water: "bg-blue-400",
    bug: "bg-lime-500",
    normal: "bg-slate-400",
    electric: "bg-yellow-400",
    dragon: "bg-blue-700",
    ice: "bg-cyan-500",
    ground: "bg-amber-800",
    rock: "bg-stone-500",
    psychic: "bg-red-300",
    ghost: "bg-violet-900",
  };

  const baseTypeClass = "font-mono text-3m text-center p-1 w-full font-bold ";
  let pokemonType = types.map((type) => (
    <p
      className={baseTypeClass + colorMap[type.Name] || "bg-slat-50"}
      key={type.Name}
    >
      {type.Name.toUpperCase()}
    </p>
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
