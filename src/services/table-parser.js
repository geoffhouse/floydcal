export default ($, tableElement) => {
    const tableData = {
        week: 0,
        days: {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
        },
    };

    $(tableElement)
        .find("tr")
        .each((rowIndex, row) => {
            const rowElement = $(row);
            if (rowElement.hasClass("toprow")) {
                // it's a 'week' row - we just want the first cell
                const cells = rowElement.find("td");
                tableData["week"] = cells.eq(0).text().slice(-1);
            } else {
                // we're dealing with the classes
                rowElement.find("td").each((colIndex, cell) => {
                    // ignore the first cell
                    if (colIndex > 0) {
                        const nodes = $(cell).contents();

                        tableData.days[colIndex].push({
                            name: nodes.eq(0).text(),
                            room: nodes.eq(2).text(),
                            staff: nodes.eq(4).text(),
                        });
                    }
                });
            }
        });
    return tableData;
};
