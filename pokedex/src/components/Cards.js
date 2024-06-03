import "../styles/Cards.css";
import React, { useEffect } from "react";
import { stringUtil, colorUtil, getTextColorBasedOnBgColor } from "../Utils";

const Cards = ({ pokemons, loading, infoPokemon }) => {
    useEffect(() => {
        const observerOptions = {
            root: document,
            rootMargin: "0px",
            threshold: 0.1,
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        const cards = document.querySelectorAll(".card-wrapper");
        cards.forEach((card) => observer.observe(card));

        return () => {
            cards.forEach((card) => observer.unobserve(card));
        };
    }, [pokemons]);

    return (
        <>
            {loading ? (
                <h1 className="loading-message">Loading Data . . .</h1>
            ) : (
                pokemons.map((pokemon) => {
                    let { color1, color2 } = colorUtil.getAllTypeColors(pokemon.types);
                    return (
                        <div
                            key={`${pokemon.id}-${pokemon.name}`}
                            className="card-wrapper gradient center-align"
                            style={{
                                "--color1": color1,
                                "--color2": color2,
                            }}
                            onClick={() => infoPokemon(pokemon)}
                        >
                            <div className="card-info-wrapper center-align">
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
                                              let color = colorUtil.getTypeColorDark(color1, i, [
                                                  p.type.name,
                                              ]);
                                              return (
                                                  <div
                                                      className="info"
                                                      style={{
                                                          backgroundColor:
                                                              colorUtil.getTypeColorDark(
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
