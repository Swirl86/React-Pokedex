import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import Pokemon from "./components/Pokemon";

function App() {
    const [pokemons, setPokemons] = useState([]);

    return (
        <div className="app">
            <Header />
            <Router>
                <Routes>
                    <Route
                        exact
                        path="/"
                        render={(props) => (
                            <PokemonList {...props} pokemons={pokemons} setPokemons={setPokemons} />
                        )}
                    />
                    <Route exact path="/:pokemonId" component={Pokemon} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
