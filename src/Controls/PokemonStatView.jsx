import React from "react";
import StatRadar from "../Charts/StatRadar";
import StatControls from "../Controls/StatContols";
import Slider from "@mui/material/Slider";

export default function PokemonStatView({
  statLables,
  statBase,
  statValues,
  level,
  onLevelSliderChange,
  onBattleStatEvChange,
  onBattleStatIvChange,
}) {
  const levelToRender = level > 0 ? level : 50;

  return (
    <div className="h-96 flex flex-wrap">
      <StatRadar
        statLables={statLables}
        statBase={statBase}
        statValues={statValues}
      />
      <div className="w-96 m-10">
        <div>
          <h2 className="text-center">Pokemon</h2>
          <p>Level</p>
          <Slider
            aria-label="Default"
            valueLabelDisplay="auto"
            max={100}
            step={5}
            onChangeCommitted={onLevelSliderChange}
            value={levelToRender}
            name="level"
          />
        </div>
        <StatControls
          onBattleStatEvChange={onBattleStatEvChange}
          onBattleStatIvChange={onBattleStatIvChange}
        />
      </div>
    </div>
  );
}
