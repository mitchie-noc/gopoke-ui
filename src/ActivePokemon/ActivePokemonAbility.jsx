import { React, useState } from "react";
import Select from "react-select";

export default function ActivePokemonAbility({
  abilities,
  activeAbility,
  onAbilitySelected,
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

  const generateOptions = () => {
    return abilities.map((ability) => ({
      value: ability.Name,
      label: ability.Name,
    }));
  };

  return (
    <div className="border border-solid font-mono text-3m h-full flex flex-col">
      <div className="border border-solid p-1 text-center bg-slate-900">
        Ability
      </div>

      <div className="p-1 text-center">
        <Select
          options={generateOptions()}
          value={
            activeAbility.Name
              ? {
                  value: activeAbility.Name,
                  label: activeAbility.Name,
                }
              : {
                  value: "Select...",
                  label: "Select...",
                }
          }
          className="basic-single"
          styles={customStyles}
          onChange={onAbilitySelected}
        />
      </div>

      <div className="flex-1 flex items-center justify-center bg-slate-800">
        {activeAbility.Effect ? (
          <div className="text-center">{activeAbility.Effect}</div>
        ) : null}
      </div>
    </div>
  );
}
