import PokemonTiles from "./PokemonTiles/PokemonTiles";
import "./index.css";

function App() {
  return (
    <>
      <div className="bg-cyan-100 flex flex-col text-slate-50">
        <div className="bg-cyan-900 flex justify-center">
          <h1 className="text-3xl font-bold underline center">PokeGo!</h1>
        </div>
        <div className="bg-cyan-900 flex justify-center text-slate-50">
          <h1 className="text-lg font-bold center">TODO: Nav bar</h1>
        </div>
        <PokemonTiles />
      </div>
    </>
  );
}

export default App;
