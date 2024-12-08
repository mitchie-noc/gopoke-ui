import React from "react";
import Slider from "@mui/material/Slider";

export default function StatControls({
  statTraining,
  onBattleStatEvChange,
  onBattleStatIvChange,
  onStatClicked,
}) {
  // Find the active stat
  const activeStat = statTraining.find((stat) => stat.active) || {
    iv: 0,
    ev: 0,
  }; // Fallback to default values if no active stat

  const stats = statTraining.map((stat, index) => {
    const col = stat.active ? "bg-sky-700 " : "bg-slate-600 ";
    const font = stat.active ? " font-bold" : "";
    const baseClass =
      "p-2 border border-solid flex-1 text-center " + col + font;
    return (
      <div onClick={onStatClicked} className={baseClass} key={index}>
        <div>{stat.name}</div>
      </div>
    );
  });

  const allocatedEvs = statTraining.reduce((sum, stat) => sum + stat.ev, 0);
  const availableEvs = 510 - allocatedEvs;
  const max = Math.min(252, activeStat.ev + availableEvs);

  return (
    <div className="">
      <div className="flex flex-row flex-wrap">{stats}</div>

      <p>IV</p>
      <Slider
        aria-label="Default"
        valueLabelDisplay="auto"
        max={31}
        value={activeStat.iv || 0} // Always controlled
        onChangeCommitted={onBattleStatIvChange}
      />
      <p>EV</p>
      <Slider
        aria-label="Default"
        valueLabelDisplay="auto"
        max={max}
        value={activeStat.ev || 0} // Always controlled
        onChangeCommitted={onBattleStatEvChange}
      />
    </div>
  );
}
