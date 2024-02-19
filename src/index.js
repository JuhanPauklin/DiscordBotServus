import { isLargerThanDaysInMonth, daysInMonthFunction, createReminder, monthNameToIndex } from'./functions.js';

import dotenv from 'dotenv';
dotenv.config();
import { Client, IntentsBitField } from 'discord.js';

import { db } from '../database.js';

let activeReminders = [];

const client = new Client(
    {
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent,
        ],
    }
);

client.on('ready', (c) => {
    console.log(`✔ ${c.user.tag} is online`)

    console.log("Current reminders in database")

    let sql = `SELECT * FROM dates`;
    db.all(sql, [], (err, rows) => {
        if (err) return console.error(err.message);
        rows.forEach((row) => {
            console.log(row)

            if (!activeReminders.includes(row.date)){
                console.log("there is a inactive reminder")

                createReminder(row.date, row.message, row.channelID, row.remindeeID)

           }
        });
    })   
});

client.on('messageCreate', (message) => {
    if (message.author.bot){
        return;
    }

    if (message.content.includes('Servus'))
    message.reply('I know who you are');
})

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hey'){
        interaction.reply('Greetings');
    }

    if (interaction.commandName === 'reminder'){
        let reminderRemindee = interaction.user
        let reminderMessage = interaction.options.get('message').value;
        const numberOfTime = interaction.options.get('number-of-time').value;
        let unitOfTime;
        if (interaction.options.get('unit-of-time') === null){
            unitOfTime = 'minutes';
        } else  {
            unitOfTime = interaction.options.get('unit-of-time').value;
        }

        let reminderDate = new Date();

        switch (unitOfTime) {
            case 'minutes':
            case 'minute':
                reminderDate.setMinutes(reminderDate.getMinutes() + numberOfTime);
                break;
            case 'hours':
            case 'hour':
                reminderDate.setHours(reminderDate.setHours() + numberOfTime);
                break;
            case 'days':
            case 'day':

                reminderDate.setDate(reminderDate.getDate() + numberOfTime);
                break;
            
        }

        createReminder(reminderDate, reminderMessage, interaction.channelId, reminderRemindee.id)
        activeReminders.push(reminderDate);
        interaction.reply(`Reminder has been created for ${reminderDate}`);
    }

    if (interaction.commandName === 'reminder-day'){
        const reminderMessage = interaction.options.get('message').value;
        let weekday = interaction.options.get('weekday').value;

        switch (String(weekday).toLowerCase()) {
            case 'sunday':
            case 'sun':
                weekday = 0;
                break;
            case 'monday':
            case 'mon':
                weekday = 1;
                break;
            case 'tuesday':
            case 'tue':
                weekday = 2;
                break;
            case 'wednesday':
            case 'wed':
                weekday = 3;
                break;
            case 'thursday':
            case 'thu':
                weekday = 4;
                break;
            case 'friday':
            case 'fri':
                weekday = 5;
                break;
            case 'saturday':
            case 'sat':
                weekday = 6;
                break;
            default:
                interaction.reply(`Incorrect weekday of '${weekday}'`);r
                return;
            
        }
        const hour = interaction.options.get('hour').value;
        const minute = interaction.options.get('minute').value;

        let curr = new Date();
        let currWeekday = curr.getDay();
        let daysToReminder = Math.abs(weekday - currWeekday);

        // Checks if the next day of the week is in this month
        let nextMonth = 0;
        let date = curr.getDate() + daysToReminder;
        if (isLargerThanDaysInMonth( curr.getMonth(), curr.getDate() + daysToReminder)){
            nextMonth = 1; // we will add one to month index
            date = date - daysInMonthFunction[curr.getMonth()]; // get the date of the weekday in the next month
        }

        let reminderDate = new Date(curr.getFullYear(), curr.getMonth() + nextMonth, date, hour, minute, 0, 0);

        createReminder(reminderDate, reminderMessage, interaction.channelId, interaction.user.id)
        activeReminders.push(reminderDate);
        interaction.reply(`Reminder has been created for ${reminderDate}`);
    }
    if (interaction.commandName === 'reminder-date'){
        const reminderMessage = interaction.options.get('message').value;
        let reminderDay = interaction.options.get('date').value;
        let reminderHour = interaction.options.get('hour').value;
        let reminderMinute = interaction.options.get('minute').value;
        let reminderMonth;
        let reminderYear;

        let curr = new Date();

        if (interaction.options.get('month') === null) {reminderMonth = curr.getMonth();} 
            else {reminderMonth = monthNameToIndex(interaction.options.get('month').value)
        };
        if (interaction.options.get('year') === null) {reminderYear = curr.getFullYear();} 
            else {reminderYear = interaction.options.get('year').value
        };

        let reminderDate = new Date(reminderYear, reminderMonth, reminderDay, reminderHour, reminderMinute, 0, 0);

        createReminder(reminderDate, reminderMessage, interaction.channelId, interaction.user.id)
        activeReminders.push(reminderDate);
        interaction.reply(`Reminder has been created for ${reminderDate}`);
    }
    
});

client.login(process.env.TOKEN);

export { client };