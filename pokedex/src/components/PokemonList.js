import "../styles/PokemonList.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./Cards";
import PokemonInfo from "./PokemonInfo";
import Pagination from "../Utils/Pagination";
import TypeChipRow from "./TypeChipRow";
import { BASE_URL, TYPE_URL } from "../constants";
import sadPokemon from "../img/sad-pokemon.png";

const PokemonList = () => {
    const [loading, setLoading] = useState(true);
    const [pokemons, setPokemons] = useState([]);
    const [pokeDex, setPokeDex] = useState();
    const [currentPageUrl, setCurrentPageUrl] = useState(BASE_URL);
    const [nextPageUrl, setNextPageUrl] = useState();
    const [prevPageUrl, setPrevPageUrl] = useState();
    const [selectedType, setSelectedType] = useState(null);
    const typeUrl = TYPE_URL;

    useEffect(() => {
        setLoading(true);
        let cancel;
        axios
            .get(currentPageUrl, {
                cancelToken: new axios.CancelToken((c) => (cancel = c)),
            })
            .then((res) => {
                setNextPageUrl(res.data.next);
                setPrevPageUrl(res.data.previous);
                getPokemon(res.data.results);
            })
            .catch((err) => {
                console.error("Request failed", err);
            });

        return () => cancel();
    }, [currentPageUrl]);

    const getPokemon = async (res) => {
        res.map((item) =>
            axios
                .get(item.url)
                .then((result) => {
                    setPokemons((state) => {
                        state = [...state, result.data];
                        state.sort((a, b) => (a.id > b.id ? 1 : -1));
                        return state;
                    });
                })
                .finally(() => {
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Request failed", err);
                })
        );
    };

    const getPokemonByType = async (res) => {
        res.map((item) =>
            axios
                .get(item.pokemon.url)
                .then((result) => {
                    setPokemons((state) => {
                        state = [...state, result.data];
                        state.sort((a, b) => (a.id > b.id ? 1 : -1));
                        return state;
                    });
                })
                .catch((err) => {
                    console.error("Request failed", err);
                })
        );
    };

    function gotoNextPage() {
        setPokemons([]);
        setCurrentPageUrl(nextPageUrl);
    }

    function gotoPrevPage() {
        setPokemons([]);
        setCurrentPageUrl(prevPageUrl);
    }

    const handleTypeClick = async (type) => {
        setLoading(true);
        if (type === "show all") {
            const res = await axios.get(currentPageUrl);
            setPokemons([]);
            setSelectedType(null);
            setNextPageUrl(res.data.next);
            setPrevPageUrl(res.data.previous);
            getPokemon(res.data.results);
        } else {
            axios
                .get(typeUrl + type)
                .then((res) => {
                    setPokemons([]);
                    getPokemonByType(res.data.pokemon);
                })
                .finally(() => {
                    setSelectedType(type);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Request failed", err);
                });
        }
    };

    return (
        <div className="wrapper">
            <TypeChipRow onTypeClick={(type) => handleTypeClick(type)} />
            <div className="split-screen">
                <div className="left-content cards-wrapper">
                    {!loading && pokemons.length === 0 ? (
                        <div className="empty-list">
                            <img className="empty-list-img" src={sadPokemon} alt={"Sad pokemon"} />
                            <h1 className="empty-list-text">Empty . . .</h1>
                        </div>
                    ) : (
                        <Cards
                            pokemons={pokemons}
                            loading={loading}
                            infoPokemon={(chosen) => setPokeDex(chosen)}
                        />
                    )}
                    {selectedType === null && (
                        <Pagination
                            gotoNextPage={nextPageUrl ? gotoNextPage : null}
                            gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
                        />
                    )}
                </div>
                <div className="right-content">{<PokemonInfo data={pokeDex} />}</div>
            </div>
        </div>
    );
};

export default PokemonList;
