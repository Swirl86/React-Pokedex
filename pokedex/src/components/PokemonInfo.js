import "../styles/PokemonInfo.css";
import React, { useState } from "react";
import { Abilities, Types } from "./Info";
import { stringUtil, colorUtil } from "../Utils";
import InfoDialog from "./InfoDialog";

const PokemonInfo = ({ data }) => {
    const [showDialog, setShowDialog] = useState(false);
    let { color1, color2 } =
        data === undefined ? "#d3d3d3" : colorUtil.getAllTypeColors(data.types); //  Pokemon type color(s)
    return (
        <>
            {showDialog && (
                <InfoDialog
                    showDialog={showDialog}
                    pokemon={data}
                    color1={color1}
                    color2={color2}
                    onCloseClicked={() => setShowDialog(false)}
                />
            )}
            {!data ? (
                ""
            ) : (
                <div className="pokemon-info-container" onClick={() => setShowDialog(true)}>
                    <div
                        className="pokemon-info-wrapper gradient center-align"
                        style={{
                            "--color1": color1,
                            "--color2": color2,
                        }}
                    >
                        <div className="pokemon-img-div">
                            <img src={data.sprites.other.home.front_default} alt={data.name} />
                        </div>
                        <div className="pokemon-image-row center-align">
                            <img src={data.sprites.front_default} alt={data.name} />
                            <img src={data.sprites.back_default} alt={data.name} />
                            <img src={data.sprites.front_shiny} alt={data.name} />
                            <img src={data.sprites.back_shiny} alt={data.name} />
                        </div>
                        <h3 className="pokemon-title">
                            #{stringUtil.getIdStyle(data.id)}:
                            {stringUtil.getFirstCharToUpperCase(data.name)}
                        </h3>
                        <div className="stats-wrapper center-align">
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
                            <Types data={data} mainColor={color1} />
                        </div>
                        <div>
                            <h4 className="info-title">Abilities</h4>
                            <Abilities data={data} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PokemonInfo;
