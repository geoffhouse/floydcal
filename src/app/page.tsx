import * as fs from "fs/promises";
import path from "path";
import fileParser from "@/services/file-parser";
import configLoader from "@/services/config-loader";
import PageHome from "./PageHome";

export default async () => {
    const filePath = path.join(process.cwd(), "public/example.html");
    const termData = await configLoader("terms.yml");
    const sessionData = await configLoader("sessions.yml");

    let htmlString = "";
    try {
        htmlString = await fs.readFile(filePath, "utf-8");
    } catch (error) {
        console.error("Failed to read HTML file:", error);
        return <div>Failed to load file.</div>;
    }

    const timetableFile = fileParser(htmlString);

    return <PageHome testTimetable={timetableFile} termData={termData} sessionData={sessionData} />;
};
