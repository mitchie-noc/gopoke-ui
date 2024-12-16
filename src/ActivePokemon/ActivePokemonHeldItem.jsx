import { React, useState } from "react";
import Select from "react-select";

export default function ActivePokemonHeldItem({
  activeItem,
  items,
  onItemSelected,
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
    return items.map((item) => ({
      value: item.name,
      label: item.name,
    }));
  };

  const activeItemText = activeItem.ShortEffect ? activeItem.ShortEffect : null;

  return (
    <div className="font-mono text-3m h-full flex flex-col">
      <div className="border border-solid p-1 text-center bg-slate-900">
        Held Item
      </div>
      <div className="p-1 text-center">
        <Select
          options={generateOptions()}
          className="basic-single"
          styles={customStyles}
          onChange={onItemSelected}
          value={
            activeItem.Name
              ? {
                  value: activeItem.Name,
                  label: activeItem.Name,
                }
              : {
                  value: "Select...",
                  label: "Select...",
                }
          }
        />
      </div>
      <div className="flex-1 flex items-center justify-center bg-slate-800">
        <div className="text-center">{activeItemText}</div>
      </div>
    </div>
  );
}
