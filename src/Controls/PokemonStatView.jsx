import React from "react";
import StatRadar from "../Charts/StatRadar";
import StatControls from "../Controls/StatContols";
import Slider from "@mui/material/Slider";

export default function PokemonStatView({
  pokemonLevel,
  stats,
  statTraining,
  onStatClicked,
  level,
  onLevelSliderChange,
  onBattleStatEvChange,
  onBattleStatIvChange,
}) {
  const levelToRender = level > 0 ? level : 50;

  return (
    <div className="h-auto flex flex-col border border-solid rounded-md m-2">
      {/* Flex container for layout */}
      <div className="flex flex-col md:flex-row md:space-x-4 max-w-full">
        {/* StatRadar */}
        <div className="border border-solid rounded-md overflow-hidden flex justify-center items-center">
          <StatRadar
            pokemonLevel={pokemonLevel}
            stats={stats}
            pokemonStatTraining={statTraining}
          />
        </div>
        {/* Sliders and controls */}
        <div className="flex flex-1 justify-center items-center p-10">
          <div className="w-full md:w-80 lg:w-96 mx-auto my-4 md:my-0 p-2 flex-shrink-0 ">
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
              statTraining={statTraining}
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
