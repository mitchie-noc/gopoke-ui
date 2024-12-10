import React from "react";
import Select from "react-select";

export default function ActivePokemonNature({
  natures,
  nature,
  onNatureSelected,
}) {
  const customStyles = {
    singleValue: (provided) => ({
      ...provided,
      color: "black", // Color of the selected value text
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black", // Example: white for selected, black otherwise
    }),
  };

  const statShorthand = {
    attack: "Atk",
    defense: "Def",
    "special-attack": "Sp.Atk",
    "special-defense": "Sp.Def",
    speed: "Spd",
    hp: "HP",
    none: "None",
  };

  const generateOptions = () => {
    return natures.map((nature) => ({
      value: nature.Name,
      label: `${nature.Name} (↑ ${statShorthand[nature.Increased_Stat]}, ↓ ${
        statShorthand[nature.Decreased_Stat]
      })`,
    }));
  };

  const handleNatureChange = (selectedOption) => {
    const selectedNature = natures.find((n) => n.Name === selectedOption.value);
    onNatureSelected(selectedNature);
  };

  return (
    <div className="border border-solid font-mono text-3m h-full flex flex-col">
      <div className="border border-solid p-1 text-center bg-slate-900 flex items-center justify-center flex-1">
        Nature
      </div>

      <div className="p-1 flex-1 text-center bg-slate-800">
        <Select
          options={generateOptions()}
          className="basic-single"
          styles={customStyles}
          onChange={handleNatureChange}
          value={
            nature.Name
              ? {
                  value: nature.Name,
                  label: nature.Name,
                }
              : {
                  value: "Select...",
                  label: "Select...",
                }
          }
        />
      </div>

      <div className="flex flex-row flex-1">
        <div className="p-1 flex-1 text-center bg-green-700 flex items-center justify-center">
          <div>
            {nature?.Increased_Stat ? statShorthand[nature.Increased_Stat] : ""}
          </div>
          <div className="mx-2">{"↑"}</div>
        </div>
        <div className="p-1 flex-1 text-center bg-red-800 flex items-center justify-center">
          <div>
            {nature?.Decreased_Stat ? statShorthand[nature.Decreased_Stat] : ""}
          </div>
          <div className="mx-2">{"↓"}</div>
        </div>
      </div>
    </div>
  );
}
