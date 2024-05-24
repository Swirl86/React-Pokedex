import { TYPE_COLORS } from "../constants";

const ColorUtil = {
    /**
     * @returns Color based on pokemon first type.
     */
    getFirstTypeColor: (pokemonInfo) => {
        if (pokemonInfo === undefined || pokemonInfo.length === 0) {
            return "#d3d3d3";
        } else {
            let type = pokemonInfo.types[0].type.name;
            return TYPE_COLORS[type];
        }
    },
    /**
     * @returns object containing color1 and color2 based on pokemon type(s).
     */
    getAllTypeColors: (types) => {
        let color1 = TYPE_COLORS[types[0].type.name];
        let color2 = types.length === 2 ? TYPE_COLORS[types[1].type.name] : color1;
        return { color1, color2 };
    },
    /**
     * Make the color a little darker for the type info background
     * @param {object} color - An object containing the card background color for the main type.
     * @returns {string} new color.
     */
    getTypeColorDark: (color, i, type) => {
        if (i === 0) {
            var red = parseInt(color[1] + color[2], 16) - 60;
            var green = parseInt(color[3] + color[4], 16) - 60;
            var blue = parseInt(color[5] + color[6], 16) - 60;
            return "rgb(" + red + "," + green + "," + blue + ")";
        } else {
            return TYPE_COLORS[type];
        }
    },
};

export default ColorUtil;
