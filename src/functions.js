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

function createReminder(reminderDate, reminderMessage, channelID, reminderRemindee){
    let curr = new Date();
    let timeUntilReminder = reminderDate.getTime() - curr.getTime();
    let timeout = setTimeout(() => {
        //interaction.followUp('Reminder went off');
        client.channels.cache.get(channelID).send(`<@${reminderRemindee.id}> Reminder "${reminderMessage}" `);

        let sql = `DELETE FROM dates WHERE date=? AND message=? AND channelID=?`
        db.run(sql, [reminderDate, reminderMessage, channelID], (err)=> {
            if (err) return console.error(err.message);
        })
    },
    timeUntilReminder);
}

export { isLargerThanDaysInMonth, daysInMonth, createReminder};