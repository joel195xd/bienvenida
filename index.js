require('dotenv').config()
const fs = require('fs')
const { Client, Intents, Collection } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = (new Collection())

client.once('ready', () => {
    console.log('Ready as ' + client.user.tag);
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, {
            command: command
        });

    }
    console.log('registered commands')
    for (const guild of client.guilds.cache.values()) {
        setSlashCommands(guild.id)
    }
});

client.on('interactionCreate', interaction => {
    if (!interaction.isCommand()) return;
    const commandObj = client.commands.find(cmd => cmd.command.commands.includes(interaction.commandName));
    if (!commandObj) return;
    const { command } = commandObj;

    try {
        command.execute(interaction);

    } catch (error) {
        console.log(error)
        interaction.channel.send("Command failed qwq")
    }
});

client.login(process.env.TOKEN);

// Registering Slash commands
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
function setSlashCommands(id) {
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');
            let cmds = [new SlashCommandBuilder()];

            cmds = client.commands.map(({ command: e }) => {
                return new SlashCommandBuilder()
                    .setName(e.name.toLowerCase())
                    .setDescription(e.description)
            });

            await rest.put(
                Routes.applicationGuildCommands(client.user.id, id),
                { body: cmds.map(c => c.toJSON()) }
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}