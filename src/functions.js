function isLargerThanDaysInMonth(monthIndex, numberOfDays) {
    const daysInMonth = [
        31, // January
        28, // February (assuming non-leap year)
        31, // March
        30, // April
        31, // May
        30, // June
        31, // July
        31, // August
        30, // September
        31, // October
        30, // November
        31  // December
    ];

    // Check if the month index is valid
    if (monthIndex < 0 || monthIndex > 11 || numberOfDays <= 0) {
        console.log("Invalid input. Please provide a valid month index and a positive number of days.");
        return false;
    }

    return numberOfDays > daysInMonth[monthIndex];
}

const daysInMonth = [
    31, // January
    28, // February (assuming non-leap year)
    31, // March
    30, // April
    31, // May
    30, // June
    31, // July
    31, // August
    30, // September
    31, // October
    30, // November
    31  // December
];

export { isLargerThanDaysInMonth, daysInMonth};