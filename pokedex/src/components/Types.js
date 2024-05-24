import "../styles/Types.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TYPE_COLORS, TYPE_URL } from "../constants";
import { stringUtil, getTextColorBasedOnBgColor } from "../Utils";

const Types = ({ onTypeClick }) => {
    const [loading, setLoading] = useState(true);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        setLoading(true);
        let cancel;
        axios
            .get(TYPE_URL, {
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
                console.error("Request failed", err);
                setLoading(false);
            });

        return () => cancel();
    }, []);

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
                                backgroundColor: TYPE_COLORS[type],
                                color: getTextColorBasedOnBgColor(TYPE_COLORS[type]),
                            }}
                            className="chip"
                            onClick={() => onTypeClick(type)}
                        >
                            {stringUtil.getFirstCharToUpperCase(type)}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Types;
