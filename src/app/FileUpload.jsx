import React, { useRef } from "react";
import { Button, Stack, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import fileParser from "@/services/file-parser";

const FileUpload = ({ onFileChange }) => {
    const fileInputRef = useRef(null);
    const [isValid, setisValid] = React.useState(null);
    const [fileDetails, setFileDetails] = React.useState({});

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const parsedFile = fileParser(e.target.result);
                if (parsedFile?.name) {
                    setisValid(true);
                    setFileDetails({
                        name: parsedFile.name,
                        registrationGroup: parsedFile.registrationGroup,
                    });
                    onFileChange(parsedFile);
                } else {
                    setisValid(false);
                    setFileDetails({});
                    onFileChange(null);
                }
            };
            reader.readAsText(file);
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleCancelClick = () => {
        setisValid(null);
        onFileChange(null);
    };

    return (
        <>
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ paddingBottom: "1rem" }}>
                <Button
                    variant="contained"
                    onClick={handleUploadClick}
                    size="large"
                    disabled={isValid !== null}
                    sx={{
                        textTransform: "none",
                        fontSize: "1.3rem",
                        fontWeight: 700,
                    }}
                >
                    Upload HTML File
                </Button>
                <Button
                    variant="contained"
                    onClick={handleCancelClick}
                    size="large"
                    color="secondary"
                    disabled={isValid === null}
                    sx={{
                        textTransform: "none",
                        fontSize: "1.3rem",
                        fontWeight: 700,
                    }}
                >
                    Start Again
                </Button>
            </Stack>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept=".html"
            />
            {isValid === true && (
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                    Timetable loaded for {fileDetails.name}, registration group {fileDetails.registrationGroup}
                </Alert>
            )}
            {isValid === false && (
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
                    Timetable failed to load
                </Alert>
            )}
        </>
    );
};

export default FileUpload;
