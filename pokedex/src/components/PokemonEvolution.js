import "../styles/PokemonEvolution.css";
import React, { useState, useEffect } from "react";
import { stringUtil, getImageById } from "../Utils";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const EvolutionItem = ({ evolution, subtitle, current }) => {
    return (
        <Grid xs={3} display="flex" justifyContent="center" alignItems="center">
            <item>
                <div>
                    <Typography variant="subtitle1" align="center">
                        <strong>
                            #{stringUtil.getIdStyle(evolution.id)}{" "}
                            {stringUtil.getFirstCharToUpperCase(evolution.name)}
                        </strong>
                    </Typography>

                    <img
                        className="evolution-img"
                        src={getImageById(evolution.id)}
                        alt="Pokemon img"
                        style={{ border: current ? `3px solid #DEB887` : `1px solid #DEB887` }}
                    />
                    <Typography variant="subtitle2" align="center">
                        {subtitle}
                    </Typography>
                </div>
            </item>
        </Grid>
    );
};

const PokemonEvolution = ({ data, id }) => {
    const [evolution, setEvolution] = useState(null);

    useEffect(() => {
        const getIdFromUrl = (url) => url.split("/").slice(-2, -1)[0];

        const buildChain = (current) => {
            const id = getIdFromUrl(current.species.url);
            const children = current.evolves_to.map(buildChain);
            return {
                id,
                name: current.species.name,
                children,
            };
        };

        const evolutionChain = buildChain(data.chain);
        setEvolution(evolutionChain);
    }, [data]);

    if (!evolution) {
        return <h1 className="loading-message">Loading Data . . .</h1>;
    }

    return (
        <Grid
            container
            wrap="nowrap"
            sx={{
                flexDirection: { xs: "column", md: "row" },
                flexWrap: { xs: "wrap", lg: "nowrap" },
            }}
            spacing={2}
            justify="flex-start"
        >
            {/* First Evolution */}
            <EvolutionItem
                evolution={evolution}
                subtitle={"Unevolved"}
                current={id === Number(evolution.id)}
            />

            {evolution.children.length > 0 && (
                <>
                    <Grid xs={3} display="flex" justifyContent="center" alignItems="center">
                        <item>
                            <ArrowForwardIcon />
                        </item>
                    </Grid>
                    {/* Second Evolution */}
                    <EvolutionItem
                        evolution={evolution.children[0]}
                        subtitle={"First evolution"}
                        current={id === Number(evolution.children[0].id)}
                    />

                    {evolution.children[0].children.length > 0 && (
                        <>
                            <Grid xs={3} display="flex" justifyContent="center" alignItems="center">
                                <item>
                                    <ArrowForwardIcon />
                                </item>
                            </Grid>
                            {/* Third Evolution */}
                            <EvolutionItem
                                evolution={evolution.children[0].children[0]}
                                subtitle={"Second evolution"}
                                current={id === Number(evolution.children[0].children[0].id)}
                            />
                        </>
                    )}
                </>
            )}
        </Grid>
    );
};

export default PokemonEvolution;
