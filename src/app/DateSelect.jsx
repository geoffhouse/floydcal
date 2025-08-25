"use client";
import termParser from "@/services/term-parser";
import termIterator from "@/services/term-iterator";
import lessonIterator from "@/services/lesson-iterator";
import icalGenerator from "@/services/ical-generator";
import downloadIcal from "@/services/download-ical";
import React from "react";
import { Checkbox, Table, TableRow, TableBody, TableCell, TableHead, Button, Box } from "@mui/material";

export default ({ timetableFile, termData, sessionData }) => {
    const [yearTermData, setYearTermData] = React.useState(null);
    const [selectedTerms, setSelectedTerms] = React.useState([]);

    const generateIcal = (termsArray) => {
        const termDays = termIterator(termsArray);
        const lessons = lessonIterator(termDays, timetableFile, sessionData);
        const icalData = icalGenerator(lessons);
        downloadIcal(icalData);
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

    const handleDownloadMultipleClicked = () => {
        const matchingTermData = yearTermData.filter((p) => {
            const key = `${p.name}${p.year}${p.half}`;
            return selectedTerms.includes(key);
        });
        generateIcal(matchingTermData);
    };

    const handleDownloadSingleClicked = (key) => {
        const matchingTermData = yearTermData.filter((p) => {
            return key === `${p.name}${p.year}${p.half}`;
        });
        generateIcal(matchingTermData);
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
