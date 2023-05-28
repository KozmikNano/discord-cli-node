require('dotenv').config();
const clc = require('cli-color');


async function updates(client, response2) {
    // Find the channel to listen for new messages in
    const channel = client.channels.cache.find(channel => channel.name === response2.value);
    // Fetch the last 50 messages in the channel
    const messages = await channel.messages.fetch({ limit: 50 });
    // Print the last 50 messages to the console
    await messages.reverse().forEach(message => {
        console.log(clc.blackBright.underline(`${message.createdAt.toLocaleTimeString()}`) + clc.blackBright.underline(` ${message.author.username}: `) + clc.blue.bold(` ${message.content}`));
    });
    // Wait for new messages in the channel
    const collector = channel.createMessageCollector(() => true);
    await collector.on('collect', message => {
        // Short Timestamp, Username: Message
        // Make the timestamp lighter than the username, make the username bolder than everything else
        console.log(clc.blackBright.underline(`${message.createdAt.toLocaleTimeString()}`) + clc.blackBright.underline(` ${message.author.username}: `) + clc.blue.bold(` ${message.content}`));
    });
}

module.exports = updates;