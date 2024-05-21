import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import Pokemon from "./components/Pokemon";

function App() {
    return (
        <div className="app">
            <Header />
            <Routes>
                <Route path="/" element={<PokemonList />}>
                    <Route exact path="/:pokemonId" component={Pokemon} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
