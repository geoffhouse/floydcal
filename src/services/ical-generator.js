import { v4 as uuidv4 } from "uuid";

const icalGenerator = (lessons) => {
    let icalString = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SHFGS//floydcal//EN\r\n`;

    lessons.forEach((lesson) => {
        const start = new Date(lesson.start).toISOString().replace(/[-:]|\.\d{3}/g, "");
        const end = new Date(lesson.end).toISOString().replace(/[-:]|\.\d{3}/g, "");
        const uid = uuidv4();

        icalString += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${start}
DTSTART:${start}
DTEND:${end}
SUMMARY:${lesson.title}
END:VEVENT\r\n`;
    });

    icalString += `END:VCALENDAR`;

    return icalString;
};
export default icalGenerator;
