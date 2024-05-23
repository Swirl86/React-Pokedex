import React from "react";
import Utils from "../Utils/Utils";

const Cards = ({ pokemons, loading, infoPokemon }) => {
    return (
        <>
            {loading ? (
                <h1 className="loading-message">Loading Data . . .</h1>
            ) : (
                pokemons.map((pokemon) => {
                    let { color1, color2 } = Utils.getTypesBkgColor(pokemon.types);

                    return (
                        <div
                            key={`${pokemon.id}-${pokemon.name}`}
                            className="card-wrapper "
                            style={{
                                "--color1": color1,
                                "--color2": color2,
                            }}
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
                            <div>
                                <div className="info-wrapper">
                                    {pokemon.types === undefined
                                        ? " "
                                        : pokemon.types.map((p, i) => {
                                              return (
                                                  <div
                                                      className="info"
                                                      style={{
                                                          backgroundColor: Utils.getTypeColor(
                                                              color1,
                                                              i,
                                                              [p.type.name]
                                                          ),
                                                      }}
                                                      key={i}
                                                  >
                                                      {Utils.getFirstCharToUpperCase(p.type.name)}
                                                  </div>
                                              );
                                          })}
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </>
    );
};
export default Cards;
