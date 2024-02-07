require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js')

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

    if (interaction.commandName === 'reminder1minute'){
        let curr = new Date();
        let reminderDate = new Date();
        console.log(`current ${curr}`)
        reminderDate.setMinutes(reminderDate.getMinutes() + 2);
        console.log(`reminder date ${reminderDate}`)

        let timeUntilReminder = reminderDate.getTime() - curr.getTime();
        console.log(reminderDate.getTime())
        console.log(curr.getTime())
        console.log(`time until reminder, `, reminderDate.getTime() - curr.getTime())
        console.log(`time until reminder ${timeUntilReminder}`)

        let timeout = setTimeout(() => {
            interaction.followUp('Reminder went off');
        },
        timeUntilReminder);
        interaction.reply(`Reminder has been created for ${reminderDate}`);


    }

    if (interaction.commandName === 'reminder'){
        const numberOfTime = interaction.options.get('number-of-time').value;
        let unitOfTime;
        if (interaction.options.get('unit-of-time') === null){
            unitOfTime = 'minutes';
        } else  {
            unitOfTime = interaction.options.get('unit-of-time').value;
        }
        
        console.log(numberOfTime);
        console.log(unitOfTime);

        let curr = new Date();
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


        console.log(`current ${curr}`)
        console.log(`reminder date ${reminderDate}`)

        let timeUntilReminder = reminderDate.getTime() - curr.getTime();

        console.log(reminderDate.getTime())
        console.log(curr.getTime())
        console.log(`time until reminder, `, reminderDate.getTime() - curr.getTime())

        let timeout = setTimeout(() => {
            interaction.followUp('Reminder went off');
        },
        timeUntilReminder);
        interaction.reply(`Reminder has been created for ${reminderDate}`);
    }
});



client.login(process.env.TOKEN);