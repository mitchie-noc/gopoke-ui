import React from "react";
import Slider from "@mui/material/Slider";

export default function StatControls({
  onBattleStatEvChange,
  onBattleStatIvChange,
}) {
  return (
    <div className="">
      <h2 className="text-center mx-50">
        <span className="px-3 bg-slate-600">{"<"}</span>HP
        <span className="px-3 bg-slate-600">{">"}</span>
      </h2>
      <p>IV</p>
      <Slider
        aria-label="Default"
        valueLabelDisplay="auto"
        max={31}
        onChangeCommitted={onBattleStatIvChange}
      />
      <p>EV</p>
      <Slider
        aria-label="Default"
        valueLabelDisplay="auto"
        max={252}
        onChangeCommitted={onBattleStatEvChange}
      />
    </div>
  );
}
