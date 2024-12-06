import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export default function SearchBar({ onSearch, items, onSelect }) {
  return (
    <ReactSearchAutocomplete
      onSearch={onSearch}
      onSelect={onSelect}
      items={items}
    />
  );
}
