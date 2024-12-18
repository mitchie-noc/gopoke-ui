import { useState, useEffect } from "react";

export default function useActivePokemonState(pokemon) {
  const [activeNature, setActiveNature] = useState({});
  const [activeAbility, setActiveAbility] = useState({});
  const [activeItem, setActiveItem] = useState({});
  const [pokemonLevel, setPokemonLevel] = useState(50);
  const [pokemonStatTraining, setPokemonStatTraining] = useState([]);

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
  }, [pokemon]);

  return {
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
  };
}
