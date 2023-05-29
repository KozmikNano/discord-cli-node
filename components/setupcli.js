require('dotenv').config();
const { PermissionsBitField } = require('discord.js');
const cliSelect = require('cli-select');
const updates = require('./messageUpdates.js');
const watchCli = require('./manageInputs.js');


async function startcli(client) {
    console.log('Please select the guild you will use to chat in:');
    const guilds = client.guilds.cache.map(guild => guild.name + ' - ' + guild.id);
    cliSelect({
        values: guilds,
        valueRenderer: (value, selected) => {
            if (selected) {
                return value + ' (Selected)';
            }
            return value;
        },
    }).then(response => {
        console.log(`You selected ${response.value}`);
        const guild = client.guilds.cache.find(guild => guild.id === response.value.split(' - ')[1]);
        console.log('Please select the channel you will use to chat in:');
        const channels = guild.channels.cache.filter(channel => {
            const permissions = channel.permissionsFor(client.user);
            return channel.type == '0' && permissions.has(PermissionsBitField.Flags.SendMessages) && permissions.has(PermissionsBitField.Flags.ViewChannel);
        }).map(channel => channel.name + ' - ' + channel.id);
        cliSelect({
            values: channels,
            valueRenderer: (value, selected) => {
                if (selected) {
                    return value + ' (Selected)';
                }
                return value;
            },
        }).then(response2 => {
            // Extract the channel id from the string
            const channel = guild.channels.cache.find(channel => channel.id === response2.value.split(' - ')[1]);
            console.log(`You selected ${channel.id}`);
            channel.messages.fetch({ limit: 50 });
            updates(client, channel);
            watchCli(client, channel);
        });
    });
}
process.on('unhandledRejection', (err) => {
    console.log('Exiting', err);
    process.exit();
});

module.exports = startcli;