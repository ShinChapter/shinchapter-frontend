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
            "IBMPlexSansKR-Regular",
            "1rem",
            "400",
            "140%",
            "-0.025em"
        ),
        Press: fontGenerator("PressStart2P-Regular"),
        Galmuri: fontGenerator("Galmuri14"),
        IBMMedium: fontGenerator("IBMPlexSansKR-Medium"),
        IBMSemiBold: fontGenerator("IBMPlexSansKR-SemiBold"),
        IBMBold: fontGenerator("IBMPlexSansKR-Bold"),
    },
};