import { React, useState } from "react";
import ActivePokemonSummary from "./ActivePokemonSummary";
import PokemonStatView from "../Controls/PokemonStatView";
import "../index.css";

export default function ActivePokemon({ pokemon, natures }) {
  const [activeNature, setActiveNature] = useState({});
  const [pokemonLevel, setPokemonLevel] = useState(50);
  const [pokemonStatTraining, setPokemonStatTraining] = useState([
    { name: "hp", iv: 0, ev: 0, nature: 1.0, active: true },
    { name: "attack", iv: 0, ev: 0, nature: 1.0, active: false },
    { name: "defense", iv: 0, ev: 0, nature: 1.0, active: false },
    { name: "speed", iv: 0, ev: 0, nature: 1.0, active: false },
    { name: "special-defense", iv: 0, ev: 0, nature: 1.0, active: false },
    { name: "special-attack", iv: 0, ev: 0, nature: 1.0, active: false },
  ]);

  const pok = pokemon[0];

  pok.Stats.sort((a, b) => {
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

  const onNatureSelected = (selectedNature) => {
    setActiveNature(selectedNature);
    setPokemonStatTraining((prevStats) => {
      // Map to adjust nature values based on the selected nature
      return prevStats.map((stat) => {
        if (stat.name === selectedNature.Increased_Stat) {
          return { ...stat, nature: 1.1 }; // Boosted stat
        } else if (stat.name === selectedNature.Decreased_Stat) {
          return { ...stat, nature: 0.9 }; // Reduced stat
        } else {
          return { ...stat, nature: 1.0 }; // Neutral for other stats
        }
      });
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 bg-slate-700 w-full p-5 sm:p-10">
      <ActivePokemonSummary
        pokemon={pok}
        nature={activeNature}
        natures={natures}
        onNatureSelected={onNatureSelected}
      />

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
