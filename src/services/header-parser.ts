export default (headerText: string) => {
    const regex =
        /Timetable for ([^,]+?) - Current year group: (\d+), Current registration group: (\w+)\. Timetable effective as at (\d{2}\/\d{2}\/\d{4})/;

    const match = headerText.replace(/\s+/g, " ").trim().match(regex);

    if (match) {
        // Destructure the matched groups
        // match[0] is the full matched string
        // match[1] is the name
        // match[2] is the year group
        // match[3] is the registration group
        // match[4] is the date
        return {
            name: match[1].trim(),
            yearGroup: match[2],
            registrationGroup: match[3],
            date: match[4],
        };
    }
    throw new Error(`header could not be parsed: ${JSON.stringify(headerText)}`);
};
