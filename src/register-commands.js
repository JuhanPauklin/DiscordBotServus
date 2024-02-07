require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType} = require('discord.js');

// Command to register commands  "node src/register-commands.js"

const commands = [
    {
        name: 'hey',
        description: 'Replies with hey!',
    },
    {
        name: 'reminder1minute',
        description: 'Sets a reminder for one minute',
    },
    {
        name: 'reminder',
        description: 'Sets a reminder based on input hours',
        options: [
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
    }
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