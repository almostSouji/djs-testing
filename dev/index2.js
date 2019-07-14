require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client({ fetchAllMembers: true });

client.on('ready', () => {
	console.log('before if');
	if (!client.guilds.first().me.permissions.has('cool_permission')) console.log('invalid permission');
	console.log('after if');
});

client.on('error', error => console.log(error));

client.login(process.env.TOKEN).catch(e => console.log(e));
