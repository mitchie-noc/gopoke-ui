import React, { useState, useEffect } from "react";
import useActivePokemonState from "../Hooks/useActivePokemonState";
import usePokemonHandlers from "../Hooks/usePokemonHandlers";
import ViewSelector from "../Controls/ViewSelector";
import ActivePokemonSummary from "./ActivePokemonSummary";
import PokemonStatView from "../Controls/PokemonStatView";
import PokemonTypeMatch from "../TypeMatchup/PokemonTypeMatch";
import "../index.css";

const viewComponents = {
  Stats: ({ pokemon, state, handlers }) => (
    <PokemonStatView
      level={state.pokemonLevel}
      pokemonLevel={state.pokemonLevel}
      stats={pokemon.Stats}
      statTraining={state.pokemonStatTraining}
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
  Matchups: () => <PokemonTypeMatch />,
};

export default function ActivePokemon({ pokemon, natures, items }) {
  const state = useActivePokemonState(pokemon);
  const handlers = usePokemonHandlers(
    pokemon,
    state.setPokemonLevel,
    state.setPokemonStatTraining,
    state.setActiveNature,
    state.setActiveAbility,
    state.setActiveItem
  );

  const [activeView, setActiveView] = useState("Stats");
  const [viewComponent, setViewComponent] = useState(null);

  useEffect(() => {
    const Component = viewComponents[activeView];
    if (Component) {
      setViewComponent(
        <Component pokemon={pokemon} state={state} handlers={handlers} />
      );
    } else {
      setViewComponent(<div>View Not Found</div>);
    }
  }, [activeView, pokemon, state, handlers]);

  useEffect(() => {
    pokemon.Stats.sort((a, b) => {
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
  }, [pokemon.Stats]);

  const onViewSelect = (viewName) => {
    setActiveView(viewName);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 bg-slate-700 w-full p-5 sm:p-10 sm:h-[50vh] h-auto">
      <ActivePokemonSummary
        pokemonData={{
          pokemon: pokemon,
          nature: state.activeNature,
          natures,
          activeAbility: state.activeAbility,
          items: items.items,
          activeItem: state.activeItem,
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
        {viewComponent}
      </div>
    </div>
  );
}
