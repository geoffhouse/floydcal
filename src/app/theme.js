import { createTheme } from "@mui/material/styles";
import { Lato } from "next/font/google";

const lato = Lato({
    weight: ["100", "300", "400", "700", "900"],
    subsets: ["latin"],
    display: "swap",
});

const theme = createTheme({
    typography: {
        fontFamily: lato.style.fontFamily,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                p: {
                    marginTop: "0.5rem",
                    marginBottom: "0.5rem",
                },
            },
        },
    },
    palette: {
        mode: "light",
        primary: {
            main: "#731c2d",
        },
        secondary: {
            main: "#585858ff",
        },
    },
});

export default theme;
