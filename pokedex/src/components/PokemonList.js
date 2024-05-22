import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./Cards";
import PokemonInfo from "./PokemonInfo";
import Pagination from "../Pagination";

const PokemonList = () => {
    const [loading, setLoading] = useState(true);
    const [pokemons, setPokemons] = useState([]);
    const [pokeDex, setPokeDex] = useState();
    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextPageUrl, setNextPageUrl] = useState();
    const [prevPageUrl, setPrevPageUrl] = useState();

    useEffect(() => {
        setLoading(true);
        let cancel;
        axios
            .get(currentPageUrl, {
                cancelToken: new axios.CancelToken((c) => (cancel = c)),
            })
            .then((res) => {
                setLoading(false);
                setNextPageUrl(res.data.next);
                setPrevPageUrl(res.data.previous);
                getPokemon(res.data.results);
            })
            .catch((err) => {
                alert("Request failed", err);
                console.error("Request failed", err);
            });

        return () => cancel();
    }, [currentPageUrl]);

    const getPokemon = async (res) => {
        res.map(async (item) => {
            const result = await axios.get(item.url);
            setPokemons((state) => {
                state = [...state, result.data];
                state.sort((a, b) => (a.id > b.id ? 1 : -1));
                return state;
            });
        });
    };

    function gotoNextPage() {
        setPokemons([]);
        setCurrentPageUrl(nextPageUrl);
    }

    function gotoPrevPage() {
        setPokemons([]);
        setCurrentPageUrl(prevPageUrl);
    }

    return (
        <div className="wrapper">
            <div className="left-content">
                <Cards
                    pokemons={pokemons}
                    loading={loading}
                    infoPokemon={(chosen) => setPokeDex(chosen)}
                />
                <Pagination
                    gotoNextPage={nextPageUrl ? gotoNextPage : null}
                    gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
                />
            </div>
            <div className="right-content">{<PokemonInfo data={pokeDex} />}</div>
        </div>
    );
};

export default PokemonList;
