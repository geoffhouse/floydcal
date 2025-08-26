import * as cheerio from "cheerio";
import headerParser from "@/services/header-parser";
import tableParser from "@/services/table-parser";

const fileParser = (html) => {
    try {
        const $ = cheerio.load(html);

        // parse header first
        const header = headerParser($("h1").text());

        // Select the table(s)
        const tableElements = $("table");

        // Pass each table to the service
        const tableData = [];
        tableElements.each((_, tableElement) => {
            tableData.push(tableParser($, tableElement));
        });

        return {
            ...header,
            timetable: tableData,
        };
    } catch (error) {
        console.log(error);
        return;
    }
};

export default fileParser;
