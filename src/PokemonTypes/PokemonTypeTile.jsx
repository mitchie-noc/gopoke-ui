import React from "react";

const colorMap = {
  grass: "bg-green-400",
  poison: "bg-violet-400",
  fire: "bg-red-500",
  flying: "bg-sky-400",
  water: "bg-blue-500",
  bug: "bg-lime-500",
  normal: "bg-slate-400",
  electric: "bg-yellow-500",
  dragon: "bg-blue-800",
  ice: "bg-cyan-500",
  ground: "bg-amber-800",
  steel: "bg-neutral-400",
  rock: "bg-stone-500",
  psychic: "bg-red-400",
  ghost: "bg-violet-900",
  dark: "bg-black",
  fairy: "bg-pink-400",
  fighting: "bg-red-900",
};

export default function PokemonTypeTile({ type, width }) {
  const baseTypeClass = "font-mono text-3m text-center p-1 w-full font-bold ";
  return (
    <div className={"justify-between rounded-t-md bg-slate-800 " + width}>
      <p className={baseTypeClass + colorMap[type] || "bg-slat-50"}>
        {type.toUpperCase()}
      </p>
    </div>
  );
}
