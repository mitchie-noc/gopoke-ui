import { React, useState, useEffect } from "react";
import PokemonTypeTyle from "../PokemonTypes/PokemonTypeTile";

export default function TypeMatchup({ pokemon }) {
  const [pokemonWeaknessTiles, setPokemonWeaknessTiles] = useState({
    immunities: [],
    weaknesses: [],
    resistances: [],
    neutral: [],
  });

  useEffect(() => {
    const fetchMatchup = async () => {
      try {
        const types = pokemon.Types.map((type) => type.Name.toLowerCase());
        const response = await fetch(
          "http://localhost:8080/api/v1/type/matchup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ types }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch matchup: ${response.statusText}`);
        }

        const matchupData = await response.json();

        setPokemonWeaknessTiles({
          immunities:
            matchupData?.immunities?.map((w) => (
              <PokemonTypeTyle type={w.typeName} width="w-24 m-1" />
            )) ?? [],
          weaknesses:
            matchupData?.weaknesses?.map((w) => (
              <PokemonTypeTyle type={w.typeName} width="w-24 m-1" />
            )) ?? [],
          resistances:
            matchupData?.resistances?.map((w) => (
              <PokemonTypeTyle type={w.typeName} width="w-24 m-1" />
            )) ?? [],
          neutral:
            matchupData?.neutral?.map((w) => (
              <PokemonTypeTyle type={w.typeName} width="w-24 m-1" />
            )) ?? [],
        });
      } catch (error) {
        console.error("Error fetching matchup data:", error);
      }
    };

    if (pokemon && pokemon.Types?.length) {
      fetchMatchup();
    }
  }, [pokemon]);

  return (
    <div className=" bg-slate-800 mx-2">
      <div className="flex flex-row border border-solid p-4">
        <div className="w-1/6 text-center">Immune To</div>
        <div className="flex flex-1 items-center justify-center mx-5 flex-wrap">
          {pokemonWeaknessTiles.immunities}
        </div>
      </div>

      <div className="flex flex-row border border-solid p-4">
        <div className="w-1/6 text-center">Resists</div>
        <div className="flex flex-1 items-center justify-center mx-5 flex-wrap">
          {pokemonWeaknessTiles.resistances}
        </div>
      </div>

      <div className="flex flex-row border border-solid p-4">
        <div className="w-1/6 text-center">Neutral</div>
        <div className="flex flex-1 items-center justify-center mx-5 flex-wrap">
          {pokemonWeaknessTiles.neutral}
        </div>
      </div>

      <div className="flex flex-row border border-solid p-4">
        <div className="w-1/6 text-center">Weak To</div>
        <div className="flex flex-1 items-center justify-center mx-5 flex-wrap">
          {pokemonWeaknessTiles.weaknesses}
        </div>
      </div>
    </div>
  );
}
