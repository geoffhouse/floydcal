import { Box, Paper, Stack, Typography } from "@mui/material";

const Step = ({ children, index }) => {
    return (
        <Paper
            sx={{
                padding: "1rem",
                textAlign: "center",
                marginBottom: "1rem",
            }}
        >
            <Stack>
                <Typography variant="h6" sx={{ paddingBottom: "1rem", fontWeight: 900 }}>
                    Step {index}
                </Typography>
                <Box>{children}</Box>
            </Stack>
        </Paper>
    );
};
export default Step;
