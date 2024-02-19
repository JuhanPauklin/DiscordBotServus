import dotenv from 'dotenv';
dotenv.config();

import { REST } from 'discord.js';
import { Routes, ApplicationCommandOptionType } from 'discord.js';

// Command to register commands  "node src/register-commands.js"

const commands = [
    {
        name: 'hey',
        description: 'Replies with hey!',
    },
    {
        name: 'reminder',
        description: 'Sets a reminder based on input hours',
        options: [
            {
                name: 'message',
                description: 'message told when reminder goes off',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'number-of-time',
                description: 'number of units of time until reminder',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'unit-of-time',
                description: 'unit of time type',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'minutes',
                        value: 'minutes',
                    },
                    {
                        name: 'hours',
                        value: 'hours',
                    },
                    {
                        name: 'days',
                        value: 'days',
                    },
                ],
            },
        ]
    },
    {
        name: 'reminder-day',
        description: 'Sets a reminder based for the next given day of the week',
        options: [
            {
                name: 'message',
                description: 'message told when reminder goes off',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'weekday',
                description: 'full "monday" or 3 first letters "mon"',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'hour',
                description: 'hour of day military time',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'minute',
                description: 'minute of the hour',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ]
    },
    {
        name: 'reminder-date',
        description: 'Sets a reminder for the given date',
        options: [
            {
                name: 'message',
                description: 'message told when reminder goes off',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'date',
                description: 'day of the month',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'hour',
                description: 'hour of day military time',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'minute',
                description: 'minute of the hour',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'month',
                description: 'full "january" or 3 first letters "jan"',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'year',
                description: 'year',
                type: ApplicationCommandOptionType.Number,
            },
        ]
    },
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )
        console.log('Slash commands were registered successfully')
    } catch (error){
        console.log(`there was an error: ${error}`);
    }
})();