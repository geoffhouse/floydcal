const termIterator = (termData) => {
    const termDays = [];
    for (let eachHalfTerm of termData) {
        // Parse the start and end dates from the 'start' and 'end' properties.
        // The 'Z' indicates UTC, so we parse them as UTC dates.
        const startDate = new Date(eachHalfTerm.start);
        const endDate = new Date(eachHalfTerm.end);
        let week = eachHalfTerm.week;

        // Loop through each day from the start date to the end date (inclusive)
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
            const dayOfWeek = currentDate.getDay();

            // Check if it's a weekday (Monday = 1 to Friday = 5)
            if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                termDays.push({
                    date: new Date(currentDate),
                    day: dayOfWeek,
                    week: week,
                });
            }

            // Move to the next day
            currentDate.setDate(currentDate.getDate() + 1);

            if (dayOfWeek === 6) {
                week = week === 1 ? 2 : 1;
            }
        }
    }
    return termDays;
};

export default termIterator;
