import axios from "axios";
import { BASE_URL, TYPE_URL, SPECIES_URL } from "../constants";

export const getPokemon = (id) => {
    const controller = new AbortController();
    axios
        .get(BASE_URL + id, {
            signal: controller.signal,
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error("Request failed", err);
            return null;
        });

    return () => controller.abort();
};

export const getSpecies = (id) => {
    const controller = new AbortController();
    axios
        .get(SPECIES_URL + id, {
            signal: controller.signal,
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error("Request failed", err);
            return null;
        });

    return () => controller.abort();
};

export const getType = (type) => {
    const controller = new AbortController();
    axios
        .get(TYPE_URL + type, {
            signal: controller.signal,
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error("Request failed", err);
            return null;
        });

    return () => controller.abort();
};
