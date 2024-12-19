import React, { useState, useEffect, useMemo } from "react";
import useActivePokemonState from "../Hooks/useActivePokemonState";
import usePokemonHandlers from "../Hooks/usePokemonHandlers";
import ViewSelector from "../Controls/ViewSelector";
import ActivePokemonSummary from "./ActivePokemonSummary";
import PokemonStatView from "../Controls/PokemonStatView";
import PokemonTypeMatch from "../TypeMatchup/PokemonTypeMatch";
import "../index.css";

export default function ActivePokemon({ pokemon, natures, items }) {
  const {
    activeNature,
    setActiveNature,
    activeAbility,
    setActiveAbility,
    activeItem,
    setActiveItem,
    pokemonLevel,
    setPokemonLevel,
    pokemonStatTraining,
    setPokemonStatTraining,
  } = useActivePokemonState(pokemon);

  const handlers = usePokemonHandlers(
    setPokemonLevel,
    setPokemonStatTraining,
    setActiveNature,
    setActiveAbility,
    setActiveItem
  );

  const [activeView, setActiveView] = useState("Stats");

  // Memoize view components
  const viewComponents = useMemo(
    () => ({
      Stats: (
        <PokemonStatView
          level={pokemonLevel}
          pokemonLevel={pokemonLevel}
          stats={pokemon.Stats}
          statTraining={pokemonStatTraining}
          onLevelSliderChange={(event, value) =>
            handlers.onPokemonLevelChange(event, value, "hp")
          }
          onBattleStatEvChange={(event, value) =>
            handlers.onPokemonBattleStatChange(event, value, "ev")
          }
          onBattleStatIvChange={(event, value) =>
            handlers.onPokemonBattleStatChange(event, value, "iv")
          }
          onStatClicked={handlers.onStatClicked}
          className="h-full flex flex-col"
        />
      ),
      Matchups: <PokemonTypeMatch pokemon={pokemon} />,
    }),
    [pokemon]
  );

  // Only sort the stats when pokemon changes, do not reset activeView
  //   useEffect(() => {
  //     pokemon.Stats.sort((a, b) => {
  //       const customOrder = [
  //         "hp",
  //         "attack",
  //         "defense",
  //         "speed",
  //         "special-defense",
  //         "special-attack",
  //       ];
  //       return customOrder.indexOf(a.Name) - customOrder.indexOf(b.Name);
  //     });
  //   }, [pokemon]);

  const onViewSelect = (viewName) => {
    setActiveView(viewName); // Set activeView directly without interference
  };

  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 bg-slate-700 w-full p-5 sm:p-10 sm:h-[50vh] h-auto">
      <ActivePokemonSummary
        pokemonData={{
          pokemon,
          nature: activeNature,
          natures,
          activeAbility,
          items: items.items,
          activeItem,
        }}
        handlers={{
          onNatureSelected: handlers.onNatureSelected,
          onAbilitySelected: handlers.onAbilitySelected,
          onItemSelected: handlers.onItemSelected,
        }}
        className="sm:w-1/3 w-full h-full"
      />
      <div className="sm:w-2/3 w-full sm:mt-0 mt-4 h-full">
        <ViewSelector
          views={[
            { name: "Stats", active: activeView === "Stats" },
            { name: "Matchups", active: activeView === "Matchups" },
          ]}
          onViewSelect={(event) => onViewSelect(event.target.innerText)}
        />
        {viewComponents[activeView] || <div>View Not Found</div>}
      </div>
    </div>
  );
}
