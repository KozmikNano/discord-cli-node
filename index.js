#! /usr/bin/env node
const startCLI = require('./components/setupCLI.js');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const { prompt } = require('enquirer');


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
	startCLI(client);
});

if (process.env.DISCORDTOKEN) {
	client.login(process.env.DISCORDTOKEN);
}
else {
	console.clear();
	prompt({
		type: 'password',
		name: 'token',
		message: 'Please enter your Discord Bot Token:',
	})
		.then((answers) => {
			client.login(answers.token);
		})
		.catch(console.error);
}
