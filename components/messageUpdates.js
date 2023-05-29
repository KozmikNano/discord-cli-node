const chalk = require('chalk');

async function updates(client, channel) {
    // Find the channel to listen for new messages in
    // Fetch the last 50 messages in the channel
    const messages = await channel.messages.fetch({ limit: 50 });
    // Print the last 50 messages to the console
    await messages.reverse().forEach(message => {
        console.log(chalk.yellowBright.dim.underline(`${message.createdAt.toLocaleTimeString()}`) + chalk.yellowBright.underline(` ${message.author.username}: `) + chalk.blue.bold(` ${message.content}`));
    });
    // Wait for new messages in the channel
    const collector = channel.createMessageCollector(() => true);
    await collector.on('collect', message => {
        // Short Timestamp, Username: Message
        // Make the timestamp lighter than the username, make the username bolder than everything else
        console.log(chalk.yellowBright.dim.underline(`${message.createdAt.toLocaleTimeString()}`) + chalk.yellowBright.dim.underline(` ${message.author.username}:`) + chalk.blue.bold(`  ${message.content}`));
    });
}

module.exports = updates;