import "../App.css";
import Utils from "../Utils/Utils";

const PokemonInfo = ({ data }) => {
    let { color1, color2 } = Utils.getTypesBkgColor(data.types); //  Pokemon type color(s)
    return (
        <>
            {!data ? (
                ""
            ) : (
                <div className="pokemon-info-container">
                    <div
                        className="pokemon-info-wrapper"
                        style={{
                            "--color1": color1,
                            "--color2": color2,
                        }}
                        irst
                    >
                        <div className="pokemon-img-div">
                            <img src={data.sprites.other.home.front_default} alt={data.name} />
                        </div>
                        <div className="pokemon-image-row">
                            <img src={data.sprites.front_default} alt={data.name} />
                            <img src={data.sprites.back_default} alt={data.name} />
                            <img src={data.sprites.front_shiny} alt={data.name} />
                            <img src={data.sprites.back_shiny} alt={data.name} />
                        </div>
                        <h3 className="pokemon-title">
                            #{Utils.getIdStyle(data.id)}:{Utils.getFirstCharToUpperCase(data.name)}
                        </h3>
                        <div className="stats-wrapper">
                            <div>
                                <h4 className="stats-title">Weight</h4>
                                <p>{data.weight}</p>
                            </div>
                            <div>
                                <h4 className="stats-title">Height</h4>
                                <p>{data.height}</p>
                            </div>
                            <div>
                                <h4 className="stats-title">Exp</h4>
                                <p>{data.base_experience}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="info-title">
                                {data.types.length === 1 ? "Type" : "Types"}
                            </h4>
                            <div className="info-wrapper">
                                {data.types === undefined
                                    ? " "
                                    : data.types.map((pokemon, i) => {
                                          return (
                                              <div
                                                  className="info"
                                                  style={{
                                                      backgroundColor: Utils.getTypeColor(
                                                          color1,
                                                          i,
                                                          [pokemon.type.name]
                                                      ),
                                                  }}
                                                  key={i}
                                              >
                                                  {Utils.getFirstCharToUpperCase(pokemon.type.name)}
                                              </div>
                                          );
                                      })}
                            </div>
                        </div>
                        <div>
                            <h4 className="info-title">Abilities</h4>
                            <div className="info-wrapper">
                                {data.abilities === undefined
                                    ? ""
                                    : data.abilities.map((pokemon, i) => {
                                          return (
                                              <div
                                                  className="info"
                                                  style={{
                                                      backgroundColor: "lightgray",
                                                  }}
                                                  key={i}
                                              >
                                                  {Utils.getFirstCharToUpperCase(
                                                      pokemon.ability.name
                                                  )}
                                              </div>
                                          );
                                      })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PokemonInfo;
