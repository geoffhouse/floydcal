const convertDate = (dateString) => {
    const parts = dateString.split("/");

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    return new Date(year, month - 1, day);
};

export default convertDate;
