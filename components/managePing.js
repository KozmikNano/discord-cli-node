const { AutoComplete, Input } = require('enquirer');

async function ping(client, channel) {
    const members = await channel.guild.members.fetch();
    const users = members.map(member => member.user.username + '#' + member.user.discriminator);

    const userPrompt = new AutoComplete({
        name: 'user',
        message: 'Select a user to ping',
        choices: users,
    });

    const selectedUser = await userPrompt.run();
    const userId = members.find(member => member.user.username + '#' + member.user.discriminator === selectedUser).user.id;


    const messagePrompt = new Input({
        name: 'message',
        message: 'What message would you like to send?',
    });
    const message = await messagePrompt.run();

    const finalMessage = `<@${userId}> ${message}`;


    return finalMessage;
}

module.exports = ping;