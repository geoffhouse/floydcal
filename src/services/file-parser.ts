import * as cheerio from "cheerio";
import headerParser from "@/services/header-parser";
import tableParser from "@/services/table-parser";

export default (html: string) => {
    const $ = cheerio.load(html);

    // parse header first
    const header = headerParser($("h1").text());

    // Select the table(s)
    const tableElements = $("table");

    // Pass each table to the service
    const tableData: any = [];
    tableElements.each((_, tableElement) => {
        tableData.push(tableParser($, tableElement));
    });

    return {
        ...header,
        timetable: tableData,
    };
};
