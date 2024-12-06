import PokemonTile from "./PokemonTile";

export default function PokemonTiles({ pokemon }) {
  return (
    <div className="flex flex-row w-100 bg-gray-800 flex-wrap">
      {pokemon.map((pok) => (
        <PokemonTile
          name={pok.Name}
          sprite={pok.Sprite}
          types={pok.Types}
          key={pok.Name}
        />
      ))}
    </div>
  );
}
