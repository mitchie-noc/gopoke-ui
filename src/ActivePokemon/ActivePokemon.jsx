import { React, useState, useEffect } from "react";
import ActivePokemonSummary from "./ActivePokemonSummary";
import PokemonStatView from "../Controls/PokemonStatView";
import "../index.css";

export default function ActivePokemon({ pokemon }) {
  const [pokemonLevel, setPokemonLevel] = useState(50);
  const [pokemonStatTraining, setPokemonStatTraining] = useState([
    { name: "hp", iv: 0, ev: 0, active: true },
    { name: "attack", iv: 0, ev: 0, active: false },
    { name: "defense", iv: 0, ev: 0, active: false },
    { name: "speed", iv: 0, ev: 0, active: false },
    { name: "special-defense", iv: 0, ev: 0, active: false },
    { name: "special-attack", iv: 0, ev: 0, active: false },
  ]);

  const pok = pokemon[0];

  const reorderedStats = pok.Stats.sort((a, b) => {
    const customOrder = [
      "hp",
      "attack",
      "defense",
      "speed",
      "special-defense",
      "special-attack",
    ];
    return customOrder.indexOf(a.Name) - customOrder.indexOf(b.Name);
  });

  const onPokemonLevelChange = (event, value, statName) => {
    setPokemonLevel(value);
  };

  const onPokemonBattleStatEvChange = (event, value, toChange) => {
    setPokemonStatTraining((prevStats) =>
      prevStats.map((stat) =>
        stat.active ? { ...stat, [toChange]: value } : stat
      )
    );
  };

  const onStatClicked = (event) => {
    const statName = event.target.innerText;
    setPokemonStatTraining((prevStats) =>
      prevStats.map((stat) => ({
        ...stat,
        active: stat.name === statName,
      }))
    );
  };

  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 bg-gray-800 w-full p-5 sm:p-10">
      <ActivePokemonSummary pokemon={pok} />

      <div className="sm:w-2/3 w-full sm:mt-0 mt-4">
        <PokemonStatView
          level={pokemonLevel}
          pokemonLevel={pokemonLevel}
          stats={pok.Stats}
          statTraining={pokemonStatTraining}
          onLevelSliderChange={(event, value) =>
            onPokemonLevelChange(event, value, "hp")
          }
          onBattleStatEvChange={(event, value) =>
            onPokemonBattleStatEvChange(event, value, "ev")
          }
          onBattleStatIvChange={(event, value) =>
            onPokemonBattleStatEvChange(event, value, "iv")
          }
          onStatClicked={onStatClicked}
        />
      </div>
    </div>
  );
}
