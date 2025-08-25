const convertTime = (timeString, baseDate) => {
    const [hours, minutes] = timeString.split(":").map(Number);

    const localDate = new Date(baseDate);
    localDate.setHours(hours, minutes, 0, 0);

    const utcHours = localDate.getUTCHours();
    const utcMinutes = localDate.getUTCMinutes();
    const utcDate = new Date(
        Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), utcHours, utcMinutes, 0, 0)
    );
    return utcDate;
};

// pass an array of days, and generate lessons using the timetable data
export default (termDays, timetableFile, sessionData) => {
    const lessons = [];

    for (let eachDay of termDays) {
        const baseDate = eachDay.date;

        const selectedWeek = timetableFile.timetable.find((t) => parseInt(t.week) === eachDay.week);
        const selectedDay = selectedWeek.days[eachDay.day];
        for (const [sessionIndex, eachLesson] of selectedDay.entries()) {
            // map to a session slot
            const selectedSession = sessionData.sessions[sessionIndex];

            // convert date strings to javascript date objects
            const startTime = convertTime(selectedSession.start, baseDate);
            const endTime = convertTime(selectedSession.end, baseDate);
            const title = [eachLesson.name];
            if (eachLesson.staff) {
                title.push(eachLesson.staff);
            }
            if (eachLesson.room) {
                title.push(eachLesson.room);
            }

            lessons.push({
                title: title.join(" / "),
                start: startTime,
                end: endTime,
            });
        }
    }
    return lessons;
};
