import React from "react";
import Utils from "../Utils/Utils";

const Cards = ({ pokemons, loading, infoPokemon }) => {
    return (
        <>
            {loading ? (
                <h1 className="loading-message">Loading Data . . .</h1>
            ) : (
                pokemons.map((pokemon) => {
                    return (
                        <div
                            key={`${pokemon.id}-${pokemon.name}`}
                            className="card-wrapper "
                            style={{ backgroundColor: Utils.getBkgColor(pokemon) }}
                            onClick={() => infoPokemon(pokemon)}
                        >
                            <div className="card-info-wrapper">
                                <div className="card-img-div">
                                    <img
                                        alt={pokemon.name}
                                        src={
                                            pokemon.length !== 0
                                                ? pokemon.sprites.front_default
                                                : "#"
                                        }
                                    />
                                </div>
                                <h3 className="card-title">
                                    #{Utils.getIdStyle(pokemon.id)}:
                                    {Utils.getFirstCharToUpperCase(pokemon.name)}
                                </h3>
                            </div>
                        </div>
                    );
                })
            )}
        </>
    );
};
export default Cards;
