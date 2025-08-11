const fontGenerator = (
    fontFamily,
    fontSize = "1rem",
    fontWeight = "400",
    lineHeight = "140%",
    letterSpacing = "-2.5%"
) => ({
    "font-family": fontFamily,
    "font-size": fontSize,
    "font-weight": fontWeight,
    "line-height": lineHeight,
    "letter-spacing": letterSpacing,
});

export const theme = {
    colors: {
        mainColor: "#B87DE9",
    },
    
    fonts: {
        default: fontGenerator(
            "IBMPlexSansKR-Medium",
            "1rem",
            "400",
            "140%",
            "-0.025em"
        ),
        PressStart2P: {
            "font-family": '"Press Start 2P"', 
            "font-weight": "400",
            "line-height": "140%",
            "letter-spacing": "-0.025em",
        },
        Galmuri: fontGenerator('"Galmuri14"'),
        Galmuri7: fontGenerator('"Galmuri7"'),
        IBMMedium: fontGenerator("IBMPlexSansKR-Medium"),
        IBMSemiBold: fontGenerator("IBMPlexSansKR-SemiBold"),
        IBMBold: fontGenerator("IBMPlexSansKR-Bold"),
        GrandifloraOne: fontGenerator("GrandifloraOne"),
        
    },
};