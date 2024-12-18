import PokemonTile from "./PokemonTile";

export default function PokemonTiles({ pokemon, pokemonTileClicked }) {
  return (
    <div className="flex flex-row w-100 bg-slate-700 flex-wrap py-1">
      {pokemon.map((pok) => (
        <PokemonTile
          pokemon={pok}
          name={pok.Name}
          sprite={pok.Sprite}
          types={pok.Types}
          key={pok.Name}
          pokemonTileClicked={pokemonTileClicked}
          className="border border-solid border-2 border-slate-50 rounded-md mx-3 flex flex-col basis-1/3 sm:basis-1/6 items-center justify-between w-full m-3 flex-1 bg-cyan-100"
        />
      ))}
    </div>
  );
}
