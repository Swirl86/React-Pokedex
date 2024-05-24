import "./styles/App.css";

import Header from "./components/Header";
import PokemonList from "./components/PokemonList";

function App() {
    return (
        <div className="app">
            <Header />
            <PokemonList />
        </div>
    );
}

export default App;
