import { React, useState } from "react";
import Select from "react-select";

export default function ActivePokemonHeldItem({}) {
  //   const customStyles = {
  //     singleValue: (provided) => ({
  //       ...provided,
  //       color: "black", // Color of the selected value text
  //     }),
  //     option: (provided, state) => ({
  //       ...provided,
  //       color: state.isSelected ? "white" : "black", // Example: white for selected, black otherwise
  //     }),
  //   };

  //   const generateOptions = () => {
  //     return abilities.map((ability) => ({
  //       value: ability.Name,
  //       label: ability.Name,
  //     }));
  //   };

  return (
    <div className="border border-solid font-mono text-3m">
      <div className="border border-solid p-1 text-center bg-slate-900">
        Held Item
      </div>
      {/* <div className="p-1 text-center">
        <Select
          options={generateOptions()}
          className="basic-single"
          styles={customStyles}
          onChange={onAbilitySelected}
        />
      </div> */}
      <div className="flex flex-row">
        <div className="p-1 flex-1 text-center bg-slate-800 flex items-center justify-center">
          Choice Scarf
        </div>
      </div>
    </div>
  );
}
