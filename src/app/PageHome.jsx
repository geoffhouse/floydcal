"use client";
import React from "react";
import { Stack, Typography } from "@mui/material";
import FileUpload from "./FileUpload";
import Step from "./Step";
import DateSelect from "./DateSelect";

export default ({ termData, sessionData }) => {
    const [timetableFile, setTimetableFile] = React.useState();

    const handleFileChange = (file) => {
        setTimetableFile(file);
    };

    return (
        <Stack>
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
                Just upload your file, select a date range and import it into your favourite online calendar. <br />
                Voila - your weekly timetable!
            </Typography>
            <Step index={1}>
                <FileUpload onFileChange={handleFileChange} />
            </Step>

            {timetableFile && (
                <Step index={2}>
                    <DateSelect timetableFile={timetableFile} termData={termData} sessionData={sessionData} />
                </Step>
            )}
        </Stack>
    );
};
