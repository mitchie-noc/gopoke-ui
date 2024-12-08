import PokemonTile from "./PokemonTile";

export default function PokemonTiles({ pokemon, pokemonTileClicked }) {
  return (
    <div className="flex flex-row w-100 bg-gray-800 flex-wrap">
      {pokemon.map((pok) => (
        <PokemonTile
          pokemon={pok}
          name={pok.Name}
          sprite={pok.Sprite}
          types={pok.Types}
          key={pok.Name}
          pokemonTileClicked={pokemonTileClicked}
        />
      ))}
    </div>
  );
}
