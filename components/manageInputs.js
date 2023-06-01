const readline = require('readline');
const ping = require('./managePing.js');

async function watchCli(client, channel) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', async (input) => {
    if (input.trim() === '') {
      console.log('You can\'t send empty messages!');
      return;
    }
    else if (input.toLowerCase() === '!quit' || input.toLowerCase() === '!exit' || input.toLowerCase() === '!q' || input.toLowerCase() === '!e') {
      quit();
    }
    else if (input.toLowerCase() === '!ping' || input.toLowerCase() === '!p') {
      rl.close();
      await channel.send(await ping(client, channel));
      watchCli(client, channel);
    }
    else {
      await channel.send(input);
      rl.prompt();
    }
  });

  rl.setPrompt('');
  rl.prompt();
}

function quit() {
  process.exit();
}

module.exports = watchCli;