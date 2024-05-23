import bkgColors from "./bkgColors";

const Utils = {
    getFirstCharToUpperCase: (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    getIdStyle: (id) => {
        if (id) {
            return id.toString().padStart(3, "0");
        }
    },

    getBkgColor: (pokemonInfo) => {
        if (pokemonInfo === undefined || pokemonInfo.length === 0) {
            return "#d3d3d3";
        } else {
            let type = pokemonInfo.types[0].type.name;
            return bkgColors[type];
        }
    },

    getTypesBkgColor: (types) => {
        if (types.length === 0) {
            return "#d3d3d3";
        } else {
            let color1 = bkgColors[types[0].type.name];
            let color2 = types.length === 2 ? bkgColors[types[1].type.name] : color1;
            return { color1, color2 };
        }
    },

    getTypeColor: (bkgColor, i, type) => {
        /*  bkgColor is the card background color for the main type,
            Green for grass type pokemon etc.*/
        if (i === 0) {
            /* Make the bkgColor color a little darker for the
            type info background*/
            var red = parseInt(bkgColor[1] + bkgColor[2], 16) - 60;
            var green = parseInt(bkgColor[3] + bkgColor[4], 16) - 60;
            var blue = parseInt(bkgColor[5] + bkgColor[6], 16) - 60;
            return "rgb(" + red + "," + green + "," + blue + ")";
        } else {
            return bkgColors[type];
        }
    },
};

export default Utils;
