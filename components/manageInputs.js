const readline = require('readline');

async function watchCli(client, channel) {
  // Create a readline interface for reading input from the CLI
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Prompt the user for input and send it to the channel when the user presses Enter
  rl.on('line', async (input) => {
    // If input contains only spaces or tab spaced than quit.
    if (input.trim() === '') {
      console.log('You can\'t send empty messages!');
      return;
    }
    else if (input === '!quit' || input === '!exit' || input === '!q' || input === '!e') {
      quit();
    }

    await channel.send(input);
    // Move the cursor to the bottom of the screen and prompt the user for more input
    readline.cursorTo(process.stdout, 0, process.stdout.rows - 1);
    rl.prompt();
  });

  // Add an event listener for the close event to exit the process
  rl.on('close', () => {
    process.exit();
  });

  rl.setPrompt('');
  rl.prompt();
}

function quit() {
  process.exit();
}

module.exports = watchCli;