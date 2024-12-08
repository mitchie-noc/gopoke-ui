import React from "react";

import "../index.css";

export default function PokemonTile({ name, sprite, types }) {
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
    <div className="border border-solid border-2 border-slate-50 rounded-md mx-3 flex flex-col basis-1/3 sm:basis-1/6 items-center justify-between w-100 m-3 flex-1 bg-cyan-100">
      <div className=" rounded-t-md bg-slate-800 w-full">
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
