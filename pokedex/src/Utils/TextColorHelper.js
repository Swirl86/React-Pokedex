/**
 * Converts a hex color to an RGB object.
 * @param {string} hex - The hex color code.
 * @returns {object} An object containing r, g, and b values.
 */
function hexToRgb(hex) {
    // Ensure that the hex value is a string and remove the hash if it exists
    if (!hex) {
        return { r: 0, g: 0, b: 0 }; // Return black as default
    }
    // Remove the hash at the start if it's there
    hex = hex.toString().replace(/^#/, "");

    // Parse r, g, b values
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return { r, g, b };
}

/**
 * Determines if a color is light or dark.
 * @param {object} rgb - An object containing r, g, and b values.
 * @returns {string} "black" or "white" based on the luminance.
 */
function getContrastYIQ(rgb) {
    const { r, g, b } = rgb;
    // Calculate luminance in YIQ color space
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
}

/**
 * Returns the appropriate text color (black or white) based on the background color.
 * @param {string} hexColor - The background color in hex format.
 * @returns {string} "black" or "white".
 */
export const getTextColorBasedOnBgColor = (hexColor) => {
    if (!hexColor) {
        return "black"; // Default to black text color if hexColor is undefined
    }
    const rgb = hexToRgb(hexColor);
    return getContrastYIQ(rgb);
};
