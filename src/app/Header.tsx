import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Stack, Paper, Typography } from "@mui/material";
import HeaderLink from "./HeaderLink";

export default () => {
    return (
        <>
            <Paper elevation={0}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ padding: "1rem" }}>
                    <Stack direction="row" alignItems="center">
                        <CalendarMonthIcon sx={{ fontSize: "3.5rem", color: "primary.main", paddingRight: "0.5rem" }} />
                        <Typography variant="h2" sx={{ fontWeight: 700, fontSize: "2.8rem" }}>
                            floydcal
                        </Typography>
                    </Stack>

                    <Stack direction="row">
                        <HeaderLink href="/" label="Home" />
                        <HeaderLink href="/about" label="About" />
                    </Stack>
                </Stack>
            </Paper>
        </>
    );
};
