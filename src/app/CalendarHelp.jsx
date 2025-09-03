import React from "react";
import { Box } from "@mui/material";
import Link from "next/link";

const CalendarHelp = () => {
    return (
        <Box sx={{ marginBottom: "1rem" }}>
            Need help importing your ICS file? Here are links for: &nbsp;
            <Link target="_blank" href="https://support.google.com/calendar/answer/37118?hl=en">
                Google Calendar
            </Link>
            ,&nbsp;
            <Link
                target="_blank"
                href="https://support.microsoft.com/en-us/office/import-or-subscribe-to-a-calendar-in-outlook-com-or-outlook-on-the-web-cff1429c-5af6-41ec-a5b4-74f2c278e98c"
            >
                Microsoft Outlook
            </Link>
            ,&nbsp;
            <Link target="_blank" href="https://www.lifewire.com/how-to-import-ics-calendar-files-in-ical-1172177">
                Apple Calendar
            </Link>
        </Box>
    );
};

export default CalendarHelp;
