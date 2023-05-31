require('dotenv').config();
const { PermissionsBitField } = require('discord.js');
const { Select } = require('enquirer');
const updates = require('./messageUpdates.js');
const watchCli = require('./manageInputs.js');


async function startCLI(client) {
    console.clear();
    console.log('Please select the guild you will use to chat in:');
    const guilds = client.guilds.cache.map(guild => guild.name + ' - ' + guild.id);
    const guildPrompt = new Select({
        name: 'guild',
        message: 'Select a guild',
        choices: guilds,
    });
    const guildResponse = await guildPrompt.run();
    console.log(`You selected ${guildResponse}`);
    const guild = client.guilds.cache.find(guild => guild.id === guildResponse.split(' - ')[1]);
    console.clear();
    console.log('Please select the channel you will use to chat in:');
    const channels = guild.channels.cache.filter(channel => {
        const permissions = channel.permissionsFor(client.user);
        return channel.type == '0' && permissions.has(PermissionsBitField.Flags.SendMessages) && permissions.has(PermissionsBitField.Flags.ViewChannel);
    }).map(channel => channel.name + ' - ' + channel.id);
    const channelPrompt = new Select({
        name: 'channel',
        message: 'Select a channel',
        choices: channels,
    });
    const channelResponse = await channelPrompt.run();
    const channel = guild.channels.cache.find(channel => channel.id === channelResponse.split(' - ')[1]);
    console.log(`You selected ${channel.id}`);
    channel.messages.fetch({ limit: 50 });
    updates(client, channel);
    watchCli(client, channel);
}

process.on('unhandledRejection', (err) => {
    console.log('Exiting', err);
    process.exit();
});

module.exports = startCLI;