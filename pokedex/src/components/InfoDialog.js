import "../styles/InfoDialog.css";
import { useEffect, useState, useRef } from "react";
import { stringUtil, colorUtil, getTextColorBasedOnBgColor } from "../Utils";
import {
    Paper,
    Typography,
    Box,
    CardActionArea,
    CardContent,
    Card,
    Chip,
    Dialog,
    Tabs,
    Tab,
    LinearProgress,
} from "@mui/material";

const InfoDialog = ({ showDialog, pokemon, color1, color2, onCloseClicked }) => {
    const [tabIndex, setTabIndex] = useState(0);

    const MIN = 0,
        MAX = 200;
    const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN);

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
                    className="gradient"
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
                                    ></img>
                                </Paper>
                            </Box>
                            <Box className="center-align flex-column card-content-box">
                                <Chip
                                    size="medium"
                                    color="primary"
                                    label={stringUtil.getFirstCharToUpperCase(pokemon.name)}
                                    style={{
                                        color: getTextColorBasedOnBgColor(color1),
                                        backgroundColor: colorUtil.getFirstTypeColor(pokemon),
                                    }}
                                />
                                <Box className="center-align flex-column flex-row">
                                    <Typography className="center-align flex-column">
                                        Height: {pokemon.height} m
                                    </Typography>
                                    <Typography className="center-align flex-column">
                                        Weight: {pokemon.weight} kg
                                    </Typography>
                                </Box>
                                <Paper
                                    className="tab-root"
                                    style={{
                                        border: `1px solid ${colorUtil.getFirstTypeColor(pokemon)}`,
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
                                        <Tab label="Stats" disableRipple />
                                        <Tab label="Abilities" disableRipple />
                                    </Tabs>
                                    <TabPanel className="tab-content" value={tabIndex} index={0}>
                                        <span>HP</span>{" "}
                                        <LinearProgress
                                            variant="determinate"
                                            value={normalise(pokemon.stats[0].base_stat)}
                                        />
                                        <span>ATK</span>{" "}
                                        <LinearProgress
                                            variant="determinate"
                                            value={normalise(pokemon.stats[1].base_stat)}
                                        />
                                        <span>DEF</span>{" "}
                                        <LinearProgress
                                            variant="determinate"
                                            value={normalise(pokemon.stats[2].base_stat)}
                                        />
                                        <span>SATK</span>{" "}
                                        <LinearProgress
                                            variant="determinate"
                                            value={normalise(pokemon.stats[3].base_stat)}
                                        />
                                        <span>SDEF</span>{" "}
                                        <LinearProgress
                                            variant="determinate"
                                            value={normalise(pokemon.stats[4].base_stat)}
                                        />
                                        <span>SPD</span>{" "}
                                        <LinearProgress
                                            variant="determinate"
                                            value={normalise(pokemon.stats[5].base_stat)}
                                        />
                                    </TabPanel>
                                    <TabPanel className="tab-content" value={tabIndex} index={1}>
                                        {pokemon.abilities.map((item) => {
                                            return (
                                                <Chip
                                                    className="chip-root"
                                                    key={item.ability.name}
                                                    variant="outlined"
                                                    size="small"
                                                    label={stringUtil.getFirstCharToUpperCase(
                                                        item.ability.name
                                                    )}
                                                />
                                            );
                                        })}
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
