"use client";

import convertDate from "@/services/convert-date";

export default async (termData, schoolYear) => {
    const result = [];
    for (let eachTerm of termData.terms) {
        const termResult = {};
        const regex = /^([A-Z]+)(\d{4})(\d)$/;
        const match = eachTerm.match(regex);

        if (match) {
            // Extract the captured groups
            const [, season, year, half] = match;

            // Format the name
            const formattedName = season.charAt(0).toUpperCase() + season.slice(1).toLowerCase();

            // Create the final object with correct data types
            termResult["name"] = formattedName;
            termResult["year"] = parseInt(year, 10);
            termResult["half"] = parseInt(half, 10);
        } else {
            throw new Error("String format is incorrect.");
        }
        // load the general start and end date
        termResult["starttext"] = termData.term_details[eachTerm].start;
        termResult["endtext"] = termData.term_details[eachTerm].end;

        // store the default week number and overwrite if custom
        termResult["week"] = termData.term_details[eachTerm]["week"];
        if (termData.term_details[eachTerm][`week_year${schoolYear}`]) {
            termResult["week"] = termData.term_details[eachTerm][`week_year${schoolYear}`];
        }

        // overwrite custom start and end dates for years
        if (termData.term_details[eachTerm][`start_year${schoolYear}`]) {
            termResult["starttext"] = termData.term_details[eachTerm][`start_year${schoolYear}`];
        }
        if (termData.term_details[eachTerm][`end_year${schoolYear}`]) {
            termResult["endtext"] = termData.term_details[eachTerm][`end_year${schoolYear}`];
        }

        // convert to javascript date object
        termResult["start"] = convertDate(termResult["starttext"]);
        termResult["end"] = convertDate(termResult["endtext"]);

        // if there's a custom start date we need to check the week number

        result.push(termResult);
    }
    return result;
};
