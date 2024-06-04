import { styled } from "@mui/material/styles";
import { Chip } from "@mui/material";
import { getTextColorBasedOnBgColor } from "../Utils";

const StyledChip = styled(Chip)(({ bgcolor, variant, size, lable }) => {
    let bgColor = bgcolor || "teal";
    return {
        color: getTextColorBasedOnBgColor(bgColor),
        backgroundColor: bgColor,
        variant: variant,
        size: size,
        lable: lable,
    };
});

export default StyledChip;

/* EXAMPLE

    <StyledChip
        key={pokemon.type.name}
        className="chip-info chip-root"
        bgcolor={color}
        variant="outlined"
        size="medium"
        label={stringUtil.getFirstCharToUpperCase(
            pokemon.type.name
        )}
    />
*/
