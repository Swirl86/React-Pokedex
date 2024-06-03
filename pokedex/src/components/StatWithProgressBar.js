import React from "react";

import { styled } from "@mui/material/styles";
import { lighten, Box, LinearProgress, Typography } from "@mui/material";
import { getTextColorBasedOnBgColor } from "../Utils";

const BorderLinearProgress = styled(LinearProgress)(({ _, progresscolor }) => {
    const defaultColor = "#3f51b5"; // Blue
    const backgroundColor = lighten(progresscolor || defaultColor, 0.5);

    return {
        height: 20,
        width: "100%",
        backgroundColor: backgroundColor,
        borderRadius: "10px",
        "& .MuiLinearProgress-bar": {
            borderRadius: 20,
            backgroundColor: progresscolor || defaultColor,
        },
    };
});

const ProgressBar = ({ progresscolor, value }) => {
    return (
        <Box
            position="relative"
            display="inline-flex"
            style={{ width: "100%", margin: "0.3rem 0rem 1rem 0rem" }}
        >
            <BorderLinearProgress
                progresscolor={progresscolor}
                variant="determinate"
                value={value}
            />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography
                    variant="body2"
                    style={{
                        color: getTextColorBasedOnBgColor(progresscolor),
                    }}
                >{`${value}`}</Typography>
            </Box>
        </Box>
    );
};

const StatWithProgressBar = ({ label, progresscolor, value }) => {
    return (
        <Box display="flex" alignItems="center" gap="1rem">
            <Typography style={{ minWidth: "50px" }}>{label}</Typography>
            <ProgressBar progresscolor={progresscolor} value={value} />
        </Box>
    );
};

export default StatWithProgressBar;
