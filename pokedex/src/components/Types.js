import "../styles/Types.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import bkgColors from "../Utils/bkgColors";
import Utils from "../Utils/Utils";

const Types = ({ onTypeClick }) => {
    const [loading, setLoading] = useState(true);
    const [types, setTypes] = useState([]);
    const url = "https://pokeapi.co/api/v2/type";

    useEffect(() => {
        setLoading(true);
        let cancel;
        axios
            .get(url, {
                cancelToken: new axios.CancelToken((c) => (cancel = c)),
            })
            .then((res) => {
                setLoading(false);
                const names = res.data.results.map((res) =>
                    res.name === "unknown" ? "show all" : res.name
                );
                //  names.sort();
                setTypes(names);
            })
            .catch((err) => {
                alert("Request failed", err);
                console.error("Request failed", err);
                setLoading(false);
            });

        return () => cancel();
    }, [url]);

    return (
        <>
            {loading ? (
                <h1 className="loading-message">Loading Data . . .</h1>
            ) : (
                <div className="chip-container">
                    {types.map((type) => (
                        <div
                            key={type}
                            style={{
                                backgroundColor: bkgColors[type],
                            }}
                            className="chip"
                            onClick={() => onTypeClick(type)}
                        >
                            {Utils.getFirstCharToUpperCase(type)}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Types;
