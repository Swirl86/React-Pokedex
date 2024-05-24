const StringUtil = {
    /**
     * @returns {string}
     */
    getFirstCharToUpperCase: (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    /**
     * @returns {string}
     */
    getIdStyle: (id) => {
        if (id) {
            return id.toString().padStart(3, "0");
        }
    },
};

export default StringUtil;
