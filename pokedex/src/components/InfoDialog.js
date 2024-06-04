import "../styles/InfoDialog.css";

import { useEffect, useState } from "react";
import axios from "axios";
import ProgressBarsPanel from "./ProgressBarsPanel";
import PokemonEvolution from "./PokemonEvolution";
import { Abilities, Types } from "./Info";
import { SPECIES_URL } from "../constants";
import { stringUtil, colorUtil } from "../Utils";
import {
    Paper,
    Typography,
    Box,
    CardActionArea,
    CardContent,
    Card,
    Dialog,
    Tabs,
    Tab,
    List,
} from "@mui/material";

// Tab Panel component to display the tab content
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={5}>{children}</Box>}
        </div>
    );
};

const InfoDialog = ({ showDialog, pokemon, color1, color2, onCloseClicked }) => {
    const [tabIndex, setTabIndex] = useState(0);
    // const [pokemonDetails, setPokemonDetails] = useState([]);
    const [descriptions, setDescriptions] = useState([]);
    const [evolutions, setEvolutions] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        axios
            .get(SPECIES_URL + pokemon.id, {
                signal: controller.signal,
            })
            .then((res) => {
                // setPokemonDetails(res.data);
                setDescriptions(
                    res.data.flavor_text_entries.reduce((ids, ob) => {
                        if (ob.language.name === "en") {
                            let str = ob.flavor_text.replace(/(\r\n|\n|\r)/gm, " ").trim();
                            if (!ids.includes(str)) {
                                ids.push(str);
                            }
                        }
                        return ids;
                    }, [])
                );

                axios
                    .get(res.data.evolution_chain.url)
                    .then((res) => {
                        setEvolutions(res.data);
                    })
                    .catch((err) => {
                        console.error("Request failed", err);
                    });
            })
            .catch((err) => {
                console.error("Request failed", err);
            });

        return () => controller.abort();
    }, [pokemon]);

    return (
        <>
            <Dialog
                className="dialog-window"
                open={showDialog}
                onClose={onCloseClicked}
                PaperProps={{
                    className: "dialog-paper",
                }}
            >
                <Card
                    className="gradient-sm"
                    style={{
                        "--color1": color1,
                        "--color2": color2,
                    }}
                >
                    <CardActionArea disableRipple component="span">
                        <CardContent className="card-content">
                            <Box className="center-align" style={{ padding: "2rem 0 2rem 0" }}>
                                <Paper
                                    className="center-align card-image"
                                    style={{
                                        background: "transparent",
                                    }}
                                >
                                    <img
                                        alt={stringUtil.getFirstCharToUpperCase(pokemon.name)}
                                        src={pokemon.sprites.other.dream_world.front_default}
                                    />
                                </Paper>
                            </Box>
                            <Box className="center-align flex-column card-content-box">
                                <Typography
                                    className="card-title-pokemon-style"
                                    variant="h3"
                                    style={{
                                        color: colorUtil.getFirstTypeColor(pokemon),
                                    }}
                                >
                                    {stringUtil.getFirstCharToUpperCase(pokemon.name)}
                                </Typography>
                                <Box className="center-align flex-column flex-row">
                                    <Typography className="center-align flex-column">
                                        Height: {pokemon.height} m
                                    </Typography>
                                    <Typography className="center-align flex-column">
                                        Weight: {pokemon.weight} kg
                                    </Typography>
                                </Box>
                                <Paper
                                    className="tab-wrapper"
                                    style={{
                                        border: `2px solid ${colorUtil.getFirstTypeColor(pokemon)}`,
                                    }}
                                >
                                    <Tabs
                                        value={tabIndex}
                                        onChange={(_, item) => {
                                            setTabIndex(item);
                                        }}
                                        TabIndicatorProps={{
                                            style: {
                                                backgroundColor:
                                                    colorUtil.getFirstTypeColor(pokemon),
                                            },
                                        }}
                                        textColor="primary"
                                    >
                                        <Tab label="About" disableRipple />
                                        <Tab label="Stats" disableRipple />
                                        <Tab label="Evolutions" disableRipple />
                                        <Tab label="More" disableRipple />
                                    </Tabs>
                                    {/* TAB ABOUT */}
                                    <TabPanel className="tab-content" value={tabIndex} index={0}>
                                        {descriptions.length === 0 ? (
                                            ""
                                        ) : (
                                            <List sx={{ listStyleType: "disc", pl: 4 }}>
                                                {descriptions.map((entrie, i) => (
                                                    <Typography
                                                        sx={{ display: "list-item" }}
                                                        key={i}
                                                        component={"span"}
                                                    >
                                                        <pre className="pre-wrapper">{entrie}</pre>
                                                    </Typography>
                                                ))}
                                            </List>
                                        )}
                                    </TabPanel>
                                    {/* TAB STATS */}
                                    <TabPanel className="tab-content" value={tabIndex} index={1}>
                                        <ProgressBarsPanel
                                            progresscolor={color1}
                                            stats={pokemon.stats}
                                        />
                                    </TabPanel>
                                    {/* TAB EVOLUTIONS */}
                                    <TabPanel className="tab-content" value={tabIndex} index={2}>
                                        <PokemonEvolution data={evolutions} id={pokemon.id} />
                                    </TabPanel>
                                    {/* TAB MORE */}
                                    <TabPanel className="tab-content" value={tabIndex} index={3}>
                                        <div>
                                            <h4 className="info-title">Abilities</h4>
                                            <Abilities data={pokemon} />
                                        </div>
                                        <div>
                                            <h4 className="info-title">
                                                {pokemon.types.length === 1 ? "Type" : "Types"}
                                            </h4>
                                            <Types data={pokemon} mainColor={color1} />
                                        </div>
                                    </TabPanel>
                                </Paper>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Dialog>
        </>
    );
};

export default InfoDialog;
