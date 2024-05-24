import "../styles/Cards.css";
import React from "react";
import { stringUtil, colorUtils, getTextColorBasedOnBgColor } from "../Utils";

const Cards = ({ pokemons, loading, infoPokemon }) => {
    return (
        <>
            {loading ? (
                <h1 className="loading-message">Loading Data . . .</h1>
            ) : (
                pokemons.map((pokemon) => {
                    let { color1, color2 } = colorUtils.getAllTypeColors(pokemon.types);

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
                                    #{stringUtil.getIdStyle(pokemon.id)}:
                                    {stringUtil.getFirstCharToUpperCase(pokemon.name)}
                                </h3>
                            </div>
                            <div>
                                <div className="info-wrapper">
                                    {pokemon.types === undefined
                                        ? " "
                                        : pokemon.types.map((p, i) => {
                                              let color = colorUtils.getTypeColorDark(color1, i, [
                                                  p.type.name,
                                              ]);
                                              return (
                                                  <div
                                                      className="info"
                                                      style={{
                                                          backgroundColor:
                                                              colorUtils.getTypeColorDark(
                                                                  color1,
                                                                  i,
                                                                  [p.type.name]
                                                              ),
                                                          color: getTextColorBasedOnBgColor(color),
                                                      }}
                                                      key={i}
                                                  >
                                                      {stringUtil.getFirstCharToUpperCase(
                                                          p.type.name
                                                      )}
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
