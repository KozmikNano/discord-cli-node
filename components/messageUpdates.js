const chalk = require('chalk');

async function updates(client, channel) {
    const messages = await channel.messages.fetch({ limit: 50 });
    messages.reverse().reverse().forEach(message => {
        if (message.content.includes('<@')) {
            const userId = message.content.split('<@')[1].split('>')[0];
            const user = client.users.cache.find(user => user.id === userId);
            const newMessage = message.content.replace(`<@${userId}>`, `@${user.username}`);
            console.log(chalk.yellowBright.dim.underline(`${message.createdAt.toLocaleTimeString()}`) + chalk.yellowBright.dim.underline(` ${chalk.bold(message.author.username)}:`) + chalk.blue.bold(`  ${newMessage}`));
        }
        else {
            console.log(chalk.yellowBright.dim.underline(`${message.createdAt.toLocaleTimeString()}`) + chalk.yellowBright.dim.underline(` ${chalk.bold(message.author.username)}:`) + chalk.blue.bold(`  ${message.content}`));
        }
    });


    const collector = channel.createMessageCollector(() => true);
    await collector.on('collect', message => {
        if (message.content.includes('<@')) {
            const userId = message.content.split('<@')[1].split('>')[0];
            const user = client.users.cache.find(user => user.id === userId);
            const newMessage = message.content.replace(`<@${userId}>`, `@${user.username}`);
            console.log(chalk.yellowBright.dim.underline(`${message.createdAt.toLocaleTimeString()}`) + chalk.yellowBright.dim.underline(` ${chalk.bold(message.author.username)}:`) + chalk.blue.bold(`  ${newMessage}`));
        }
        else {
            console.log(chalk.yellowBright.dim.underline(`${message.createdAt.toLocaleTimeString()}`) + chalk.yellowBright.dim.underline(` ${chalk.bold(message.author.username)}:`) + chalk.blue.bold(`  ${message.content}`));
        }
    });
}

module.exports = updates;