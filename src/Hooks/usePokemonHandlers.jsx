export default function usePokemonHandlers(
  setPokemonLevel,
  setPokemonStatTraining,
  setActiveNature,
  setActiveAbility,
  setActiveItem
) {
  const onPokemonLevelChange = (event, value, statName) => {
    setPokemonLevel(value);
  };

  const onPokemonBattleStatChange = (event, value, toChange) => {
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
    setPokemonStatTraining((prevStats) =>
      prevStats.map((stat) => {
        if (stat.name === selectedNature.Increased_Stat) {
          return { ...stat, nature: 1.1 };
        } else if (stat.name === selectedNature.Decreased_Stat) {
          return { ...stat, nature: 0.9 };
        } else {
          return { ...stat, nature: 1.0 };
        }
      })
    );
  };

  const onAbilitySelected = (selected, abilities) => {
    const activeAbility = abilities.find(
      (ability) => ability.Name === selected.value
    );
    setActiveAbility(activeAbility);
  };

  const onItemSelected = async (selectedItem) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/item/${selectedItem.value}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch item details: ${response.statusText}`);
      }

      const itemDetails = await response.json();

      setActiveItem(itemDetails);
    } catch (error) {
      console.error("Error fetching item details:", error);
      alert("Failed to fetch item details. Please try again.");
    }
  };

  return {
    onPokemonLevelChange,
    onPokemonBattleStatChange,
    onStatClicked,
    onNatureSelected,
    onAbilitySelected,
    onItemSelected,
  };
}
