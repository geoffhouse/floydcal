"use client";
import termParser from "@/services/term-parser";
import termIterator from "@/services/term-iterator";
import lessonIterator from "@/services/lesson-iterator";
import icalGenerator from "@/services/ical-generator";
import downloadIcal from "@/services/download-ical";
import React from "react";
import { Checkbox, Table, TableRow, TableBody, TableCell, TableHead, Button, Box } from "@mui/material";

const DateSelect = ({ timetableFile, termData, sessionData }) => {
    const [yearTermData, setYearTermData] = React.useState(null);
    const [selectedTerms, setSelectedTerms] = React.useState([]);

    const generateIcal = (termsArray, filename) => {
        const termDays = termIterator(termsArray);
        const lessons = lessonIterator(termDays, timetableFile, sessionData);
        const icalData = icalGenerator(lessons);
        downloadIcal(icalData, filename);
    };

    const handleCheckboxClicked = (checked, key) => {
        if (checked) {
            if (!selectedTerms.includes(key)) {
                setSelectedTerms([...selectedTerms, key]);
            }
        } else {
            if (selectedTerms.includes(key)) {
                setSelectedTerms(selectedTerms.filter((t) => t !== key));
            }
        }
    };

    const handleCheckboxAllClicked = () => {
        if (selectedTerms.length === yearTermData.length) {
            setSelectedTerms([]);
        } else {
            const keys = yearTermData.map((halfTerm) => `${halfTerm.name}${halfTerm.year}${halfTerm.half}`);
            setSelectedTerms(keys);
        }
    };

    const generateFilename = (terms) => {
        // convert name into lower case, no spaces
        const name = timetableFile.name.toLowerCase().replace(" ", "");
        const registrationGroup = timetableFile.registrationGroup.toLowerCase().replace(" ", "");

        let termLabel = "all";
        if (terms.length !== yearTermData.length) {
            // now shorten term names
            const shortenedTermNamesArray = terms.map((st) => {
                const firstThree = st.slice(0, 3);
                const lastThree = st.slice(-3);
                return firstThree + lastThree;
            });

            termLabel = shortenedTermNamesArray.join("_").toLowerCase();
        }

        // now add date
        const now = new Date();
        const currentYear = now.getFullYear().toString().slice(-2);
        const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");
        const currentDay = now.getDate().toString().padStart(2, "0");
        const timestamp = `${currentYear}${currentMonth}${currentDay}`;

        // assemble filename
        const filename = `${name}_${registrationGroup}_${termLabel}_${timestamp}.ics`;
        return filename;
    };

    const handleDownloadMultipleClicked = () => {
        const matchingTermData = yearTermData.filter((p) => {
            const key = `${p.name}${p.year}${p.half}`;
            return selectedTerms.includes(key);
        });
        const filename = generateFilename(selectedTerms);
        generateIcal(matchingTermData, filename);
    };

    const handleDownloadSingleClicked = (key) => {
        const matchingTermData = yearTermData.filter((p) => {
            return key === `${p.name}${p.year}${p.half}`;
        });
        const filename = generateFilename([key]);
        generateIcal(matchingTermData, filename);
    };

    React.useEffect(() => {
        const fetchData = async () => {
            const parsedTermData = await termParser(termData, parseInt(timetableFile.yearGroup));
            setYearTermData(parsedTermData);
        };

        fetchData();
    }, []);

    if (!yearTermData) {
        return null;
    }

    return (
        <>
            <Table>
                <TableHead
                    sx={{
                        "& .MuiTableCell-root": {
                            fontWeight: 700,
                        },
                    }}
                >
                    <TableRow>
                        <TableCell sx={{ width: "5rem" }}>
                            <Checkbox
                                checked={selectedTerms.length === yearTermData.length}
                                indeterminate={selectedTerms.length < yearTermData.length && selectedTerms.length > 0}
                                onChange={() => handleCheckboxAllClicked()}
                            />
                        </TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {yearTermData.map((halfTerm) => {
                        const key = `${halfTerm.name}${halfTerm.year}${halfTerm.half}`;
                        return (
                            <TableRow key={key}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedTerms.includes(key)}
                                        onChange={(e) => handleCheckboxClicked(e.target.checked, key)}
                                    />
                                </TableCell>
                                <TableCell>
                                    {halfTerm.name} {halfTerm.year} / {halfTerm.half}
                                </TableCell>
                                <TableCell>{halfTerm.starttext}</TableCell>
                                <TableCell>{halfTerm.endtext}</TableCell>
                                <TableCell>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        onClick={() => handleDownloadSingleClicked(key)}
                                    >
                                        Export
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <Box
                sx={{
                    textAlign: "left",
                    paddingTop: "1rem",
                }}
            >
                <Button
                    color="secondary"
                    variant="contained"
                    disabled={selectedTerms.length === 0}
                    onClick={handleDownloadMultipleClicked}
                >
                    Export Multiple
                </Button>
            </Box>
        </>
    );
};

export default DateSelect;
