import React from "react";

export default function calculateStat(
  base,
  iv,
  ev,
  level,
  natureModifier,
  isHP = false
) {
  let stat;

  if (isHP) {
    // HP stat formula
    stat =
      Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) +
      level +
      10;
  } else {
    // Other stats formula
    stat = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
    // Apply the nature modifier
    stat *= natureModifier;
  }

  // Return the stat as an integer (rounded down)
  return Math.floor(stat);
}
