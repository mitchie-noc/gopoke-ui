import React, { useState, useEffect } from "react";
import useFetchData from "../Hooks/useFetchData";
import ActivePokemonSummary from "./ActivePokemonSummary";
import PokemonStatView from "../Controls/PokemonStatView";
import "../index.css";

export default function ActivePokemon({ pok, natures, items }) {
  const [activeNature, setActiveNature] = useState({});
  const [activeAbility, setActiveAbility] = useState({});
  const [activeItem, setActiveItem] = useState({});
  const [pokemonLevel, setPokemonLevel] = useState(50);
  const [pokemonStatTraining, setPokemonStatTraining] = useState([]);

  // Initialize or reset state when 'pok' changes
  useEffect(() => {
    setPokemonStatTraining([
      { name: "hp", iv: 0, ev: 0, nature: 1.0, active: true },
      { name: "attack", iv: 0, ev: 0, nature: 1.0, active: false },
      { name: "defense", iv: 0, ev: 0, nature: 1.0, active: false },
      { name: "speed", iv: 0, ev: 0, nature: 1.0, active: false },
      { name: "special-defense", iv: 0, ev: 0, nature: 1.0, active: false },
      { name: "special-attack", iv: 0, ev: 0, nature: 1.0, active: false },
    ]);
    setActiveNature({});
    setActiveAbility({});
    setActiveItem({});
    setPokemonLevel(50);
  }, [pok]); // This ensures the state resets whenever the 'pok' prop changes

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
      return prevStats.map((stat) => {
        if (stat.name === selectedNature.Increased_Stat) {
          return { ...stat, nature: 1.1 };
        } else if (stat.name === selectedNature.Decreased_Stat) {
          return { ...stat, nature: 0.9 };
        } else {
          return { ...stat, nature: 1.0 };
        }
      });
    });
  };

  const onAbilitySelected = (x) => {
    const activeAbility = pok.Abilities.find(
      (ability) => ability.Name === x.value
    );
    setActiveAbility(activeAbility);
  };

  const onItemSelected = async (selectedItem) => {
    try {
      // Make an API call to fetch details for the selected item
      const response = await fetch(
        `http://localhost:8080/api/v1/item/${selectedItem.value}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch item details: ${response.statusText}`);
      }

      const itemDetails = await response.json();

      // Update the activeItem state with the API response
      setActiveItem(itemDetails);
    } catch (error) {
      console.error("Error fetching item details:", error);
      alert("Failed to fetch item details. Please try again.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 bg-slate-700 w-full p-5 sm:p-10">
      <ActivePokemonSummary
        pokemon={pok}
        nature={activeNature}
        natures={natures}
        onNatureSelected={onNatureSelected}
        onAbilitySelected={onAbilitySelected}
        activeAbility={activeAbility}
        items={items.items}
        onItemSelected={onItemSelected}
        activeItem={activeItem}
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
