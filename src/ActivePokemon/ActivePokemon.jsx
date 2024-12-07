import { React, useState } from "react";
import PokemonTile from "../PokemonTiles/PokemonTile";
import PokemonStateView from "../Controls/PokemonStatView";
import calculateStat from "../Util/Utils";
import "../index.css";

export default function ActivePokemon({ pokemon }) {
  const [pokemonLevel, setPokemonLevel] = useState(50);
  const [pokemonStatTraining, setPokemonStatTraining] = useState([
    {
      name: "hp",
      iv: 0,
      ev: 0,
      active: true,
    },
    {
      name: "attack",
      iv: 0,
      ev: 0,
      active: false,
    },
    {
      name: "defense",
      iv: 0,
      ev: 0,
      active: false,
    },
    {
      name: "speed",
      iv: 0,
      ev: 0,
      active: false,
    },
    {
      name: "special-defence",
      iv: 0,
      ev: 0,
      active: false,
    },
    {
      name: "special-attack",
      iv: 0,
      ev: 0,
      active: false,
    },
  ]);

  const pok = pokemon[0];
  console.log(pok);

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

  return (
    <div className="flex flex-row flex-wrap bg-gray-800 w-full p-10">
      <div>
        <div className="h-48 w-96 flex">
          <div className=" w-38 h-48">
            <PokemonTile
              name={pok.Name}
              sprite={pok.Sprite}
              types={pok.Types}
              key={pok.Name}
            />
          </div>

          <div className="h-48 grid grid-row-3 p-5">
            <div className="p-2">Ability = wowsa</div>
            <div className="p-2">Held item = choice scarf</div>
            <div className="p-2">Natue = Timid</div>
          </div>
        </div>

        <div className="h-48">
          <p>Bottom!</p>
        </div>
      </div>

      <div className="h-96 flex flex-col bg-pink-500 overflow-scroll mx-10">
        <div className="p-2">Ability = wowsa</div>
        <div className="p-2">Held item = choice scarf</div>
        <div className="p-2">Natue = Timid</div>
        <div className="p-2">Ability = wowsa</div>
        <div className="p-2">Held item = choice scarf</div>
        <div className="p-2">Natue = Timid</div>
        <div className="p-2">Ability = wowsa</div>
        <div className="p-2">Held item = choice scarf</div>
        <div className="p-2">Natue = Timid</div>
        <div className="p-2">Ability = wowsa</div>
        <div className="p-2">Held item = choice scarf</div>
        <div className="p-2">Natue = Timid</div>
        <div className="p-2">Ability = wowsa</div>
        <div className="p-2">Held item = choice scarf</div>
        <div className="p-2">Natue = Timid</div>
      </div>

      <PokemonStateView
        level={pokemonLevel}
        statLables={pok.Stats.map((stat) => stat.Name)}
        statBase={pok.Stats.map((stat) => stat.Base)}
        statValues={pok.Stats.map((stat) => {
          const training = pokemonStatTraining.find(
            (t) => t.name === stat.Name
          );
          const iv = training ? training.iv : 0; // Default to 0 if not found
          const ev = training ? training.ev : 0; // Default to 0 if not found
          const isHP = stat.Name.toLowerCase() === "hp"; // Check if it's HP
          return calculateStat(stat.Base, iv, ev, pokemonLevel, 1.0, isHP);
        })}
        onLevelSliderChange={(event, value) =>
          onPokemonLevelChange(event, value, "hp")
        }
        onBattleStatEvChange={(event, value) =>
          onPokemonBattleStatEvChange(event, value, "ev")
        }
        onBattleStatIvChange={(event, value) =>
          onPokemonBattleStatEvChange(event, value, "iv")
        }
      />
    </div>
  );
}
