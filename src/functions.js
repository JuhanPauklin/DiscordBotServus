import { client } from './index.js';
import { db } from '../database.js';

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

function createReminder(reminderDate, reminderMessage, channelID, reminderRemindeeID){
    let curr = new Date();
    if (typeof(reminderDate === Number)){
        reminderDate = new Date(reminderDate)
    }

    let timeUntilReminder = reminderDate.getTime() - curr.getTime();
    let timeout = setTimeout(() => {
        //interaction.followUp('Reminder went off');
        client.channels.cache.get(channelID).send(`<@${reminderRemindeeID}> Reminder "${reminderMessage}" `);

        let sql = `DELETE FROM dates WHERE date=? AND message=? AND channelID=? AND remindeeID=?`
        db.run(sql, [reminderDate, reminderMessage, channelID, reminderRemindeeID], (err)=> {
            if (err) return console.error(err.message);
        })
    },
    timeUntilReminder);

    let sql = `INSERT INTO dates(date, message, channelID, remindeeID) VALUES (?, ?, ?, ?)`;
    db.run(sql, [reminderDate, reminderMessage, channelID, reminderRemindeeID], (err)=> {
        if (err) return console.error(err.message);
    })

    console.log(`Created reminder for ${reminderDate} with message "${reminderMessage}" in channel ${channelID} for ${reminderRemindeeID}`)
}

export { isLargerThanDaysInMonth, daysInMonth, createReminder};