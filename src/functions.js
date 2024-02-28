import { client } from './index.js';
import { db } from '../database.js';

function createReminder(reminderDate, reminderMessage, channelID, reminderRemindeeID, reminderRole){
    let curr = new Date();
    if (typeof(reminderDate === Number)){
        reminderDate = new Date(reminderDate)
    }

    let timeUntilReminder = reminderDate.getTime() - curr.getTime();
    let timeout = setTimeout(() => {
        let reminderRolePing;
        if (reminderRole == null) {reminderRole = 'none'};
        if (reminderRole == 'none') {reminderRolePing = ""} else {reminderRolePing = reminderRole}
        client.channels.cache.get(channelID).send(`<@${reminderRemindeeID}> Reminder "${reminderMessage}" ` + reminderRolePing);

        let sql = `DELETE FROM dates WHERE date=? AND message=? AND channelID=? AND remindeeID=? AND reminderRole=?`
        db.run(sql, [reminderDate, reminderMessage, channelID, reminderRemindeeID, reminderRole], (err)=> {
            if (err) return console.error(err.message);
        })
        console.log(`Reminder for ${reminderDate} with message "${reminderMessage}" has gone off.`)
    },
    timeUntilReminder);

    let sql = `INSERT INTO dates(date, message, channelID, remindeeID, reminderRole) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [reminderDate, reminderMessage, channelID, reminderRemindeeID, reminderRole], (err)=> {
        if (err) return console.error(err.message);
    })

    console.log(`Created reminder for ${reminderDate} with message "${reminderMessage}" in channel ${channelID} for ${reminderRemindeeID}`)
}

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
    let leapYearFebruary = 0;
    if (checkLeapYear() && monthIndex==2) {
        leapYearFebruary = 1;
    } 

    return numberOfDays > daysInMonth[monthIndex] + leapYearFebruary;
}

function daysInMonthFunction(currMonth) {
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
    if (checkLeapYear()) {daysInMonth[1] + 1}
    return daysInMonth[currMonth];
};

function monthNameToIndex(monthName) {
    const months = [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december',
    ];
    for (let i = 0; i < months.length; i++){
        if (String(monthName).toLowerCase() == months[i]){
            return i;
        }
    }
    const monthsShort = [
        'jan',
        'feb',
        'mar',
        'apr',
        'may',
        'jun',
        'jul',
        'aug',
        'sep',
        'oct',
        'nov',
        'dec',
    ];
    for (let i = 0; i < monthsShort.length; i++){
        if (String(monthName).toLowerCase() == monthsShort[i]){
            return i;
        }
    }
    return -1;

};

function checkLeapYear() {
    let curr = new Date();
    let year = curr.getFullYear;
    return ((0 == year % 4) && (0 != year % 100) || (0 == year % 400))
}

export { isLargerThanDaysInMonth, daysInMonthFunction, createReminder, monthNameToIndex};