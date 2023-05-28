// Call in the modules and config and load the commands
const startcli = require('./components/setupcli.js');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();


// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.once('ready', () => {
	startcli(client);
});

// check if the token exists in .env, if not ask for it, and then login to discord
if (process.env.DISCORDTOKEN) {
	client.login(process.env.DISCORDTOKEN);
}
else {
	const readline = require('readline'),
		rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
	rl.input.on('keypress', function() {
		// get the number of characters entered so far:
		const len = rl.line.length;
		// move cursor back to the beginning of the input:
		readline.moveCursor(rl.output, -len, 0);
		// clear everything to the right of the cursor:
		readline.clearLine(rl.output, 1);
		// replace the original input with asterisks:
		for (let i = 0; i < len; i++) {
			rl.output.write('*');
		}
	});
	rl.question('Please enter your Discord Bot Token: ', (token) => {
		client.login(token);
		rl.close();
	});
}
