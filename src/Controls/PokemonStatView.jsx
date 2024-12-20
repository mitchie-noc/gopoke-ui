import React from "react";
import StatRadar from "../Charts/StatRadar";
import StatControls from "../Controls/StatContols";
import Slider from "@mui/material/Slider";

export default function PokemonStatView({
  pokemon,
  onStatClicked,
  onLevelSliderChange,
  onBattleStatEvChange,
  onBattleStatIvChange,
}) {
  const levelToRender = pokemon.pokemonLevel > 0 ? pokemon.pokemonLevel : 50;

  return (
    <div className="h-full flex flex-col border border-solid rounded-md m-2">
      <div className="flex flex-col md:flex-row flex-1 max-w-full h-full">
        <div className="border border-solid rounded-md overflow-hidden flex flex-1 justify-center items-center bg-slate-900 h-full">
          <StatRadar
            pokemonLevel={pokemon.pokemonLevel}
            stats={pokemon.Stats}
            pokemonStatTraining={pokemon.pokemonStatTraining}
          />
        </div>

        <div className="flex flex-1 justify-center items-center p-10 bg-slate-800 h-full">
          <div className="w-full md:w-80 lg:w-96 mx-auto my-4 md:my-0 p-2 flex-shrink-0">
            <div>
              <h2 className="text-center text-base md:text-lg font-medium">
                Pokemon Stats
              </h2>
              <p className="text-sm">Level</p>
              <Slider
                aria-label="Pokemon Level"
                valueLabelDisplay="auto"
                max={100}
                min={1}
                step={5}
                onChangeCommitted={onLevelSliderChange}
                value={levelToRender}
                name="level"
                className="w-full"
              />
            </div>
            <StatControls
              statTraining={pokemon.pokemonStatTraining}
              onBattleStatEvChange={onBattleStatEvChange}
              onBattleStatIvChange={onBattleStatIvChange}
              onStatClicked={onStatClicked}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
