import * as fs from "fs/promises";
import path from "path";
import fileParser from "@/services/file-parser";

export default async function HomePage() {
    const filePath = path.join(process.cwd(), "public/example.html");

    let htmlString = "";
    try {
        htmlString = await fs.readFile(filePath, "utf-8");
    } catch (error) {
        console.error("Failed to read HTML file:", error);
        return <div>Failed to load file.</div>;
    }

    const file = fileParser(htmlString);

    console.log(file);
    return <>done</>;
}
