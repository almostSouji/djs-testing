const { stripIndents } = require('common-tags');
const lockfile = require('@yarnpkg/lockfile');
const { MessageEmbed } = require('discord.js');
const { readFileSync } = require('fs');


module.exports = {
	name: 'version',
	description: 'versioncmd',
	aliases: ['v', 'ver', 'commit'],
	ownerOnly: true,
	execute(msg) {
		const file = readFileSync('./yarn.lock', 'utf8');
		const dependencies = lockfile.parse(file).object;
		const hashReg = /ta?r?\.?gz(\/|#)(\w+)/;
		const djs = dependencies['discord.js@discordjs/discord.js'];
		const djsHash = djs.resolved.match(hashReg)[2];

		const embed = new MessageEmbed()
			.setThumbnail(msg.client.user.displayAvatarURL)
			.addField(`Library: Discord.js: ${djs.version}`, stripIndents`Commithash: \`${djsHash}\`
					[view on GitHub](https://github.com/discordjs/discord.js/commit/${djsHash})`)
			.setFooter(`Node.js ${process.version}`, 'https://cdn.discordapp.com/emojis/475614309238702101.png')
			.setColor(3553599);

		msg.channel.send(embed);
	}
};
