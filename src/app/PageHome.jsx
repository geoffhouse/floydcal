"use client";
import React from "react";
import { Stack, Typography, Box, Alert } from "@mui/material";
import FileUpload from "./FileUpload";
import Step from "./Step";
import DateSelect from "./DateSelect";
import YearSelect from "./YearSelect";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CalendarHelp from "./CalendarHelp";

const PageHome = ({ termData, sessionData }) => {
    const [timetableFile, setTimetableFile] = React.useState();
    const [year, setYear] = React.useState();

    const handleFileChange = (file) => {
        setTimetableFile(file);
    };

    const handleYearSelect = (year) => {
        setYear(year);
        // replace registrationGroup
        const form = timetableFile.registrationGroup.slice(-1);
        setTimetableFile({ ...timetableFile, yearGroup: year.toString(), registrationGroup: `${year}${form}` });
    };

    console.log(timetableFile);

    return (
        <Stack>
            <Box
                sx={{
                    display: {
                        xs: "block",
                        sm: "none",
                    },
                    marginBottom: "1rem",
                }}
            >
                <Alert icon={<WarningAmberIcon fontSize="inherit" />} severity="warning">
                    This site is best used on desktop devices and may not work on mobiles.
                </Alert>
            </Box>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                }}
            >
                Convert Your Personal School <br />
                Calendar to iCal
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    fontWeight: 500,
                    padding: "1rem",
                }}
            >
                Upload your file, select the year and date range, then import it into your favourite online calendar.
                <br />
                Voila - your weekly timetable!
            </Typography>
            <CalendarHelp />
            <Step index={1}>
                <FileUpload onFileChange={handleFileChange} />
            </Step>

            {timetableFile && (
                <Step index={2}>
                    <YearSelect timetableFile={timetableFile} onYearSelect={handleYearSelect} />
                </Step>
            )}

            {timetableFile && year && (
                <Step index={3}>
                    <DateSelect timetableFile={timetableFile} termData={termData} sessionData={sessionData} />
                </Step>
            )}
        </Stack>
    );
};
export default PageHome;
