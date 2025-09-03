"use client";
import React from "react";
import { Grid, Typography, TextField, Select, MenuItem, Stack, Button, Box } from "@mui/material";

const YearSelect = ({ timetableFile, onYearSelect }) => {
    const [year, setYear] = React.useState(timetableFile.yearGroup);

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleConfirm = () => {
        onYearSelect(year);
    };

    return (
        <Stack gap={2}>
            <Typography variant="body1">
                Please confirm student details are correct - especially the year group as this can affect term start and
                end dates
            </Typography>
            <Grid container noValidate spacing={3}>
                <Grid
                    size={{ xs: 12, md: 4 }}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                    }}
                >
                    <Typography variant="subtitle1">Student name</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 8 }} sx={{ textAlign: "left" }}>
                    <TextField value={timetableFile.name} variant="outlined" disabled sx={{ width: "24rem" }} />
                </Grid>
                <Grid
                    size={{ xs: 12, md: 4 }}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                    }}
                >
                    <Typography variant="subtitle1">Year group</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 8 }} sx={{ textAlign: "left" }}>
                    <Select value={year} sx={{ width: "24rem" }} onChange={handleYearChange}>
                        <MenuItem value={7}>Year 7</MenuItem>
                        <MenuItem value={8}>Year 8</MenuItem>
                        <MenuItem value={9}>Year 9</MenuItem>
                        <MenuItem value={10}>Year 10</MenuItem>
                        <MenuItem value={11}>Year 11</MenuItem>
                        <MenuItem value={12}>Year 12</MenuItem>
                        <MenuItem value={13}>Year 13</MenuItem>
                    </Select>
                </Grid>
            </Grid>
            <Box>
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        textTransform: "none",
                        fontSize: "1.3rem",
                        fontWeight: 700,
                    }}
                    onClick={handleConfirm}
                >
                    Confirm
                </Button>
            </Box>
        </Stack>
    );
};

export default YearSelect;
