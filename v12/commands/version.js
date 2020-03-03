const { stripIndents } = require('common-tags');
const lockfile = require('@yarnpkg/lockfile');
const djs = require('discord.js');
const { readFileSync } = require('fs');


module.exports = {
	name: 'version',
	description: 'versioncmd',
	aliases: ['v', 'ver', 'commit'],
	ownerOnly: true,
	buildInfoEmbed(discordJS, msg) {
		const hashReg = /(?:tar.gz\/|#)(\w+)/;
		const djsHash = discordJS.match(hashReg)[1];
		const embed = new djs.MessageEmbed()
			.setThumbnail(msg.client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
			.addField(`Library: Discord.js: ${djs.version}`, stripIndents`Commithash: \`${djsHash}\`
					[view on GitHub](https://github.com/discordjs/discord.js/commit/${djsHash})`)
			.setFooter(`Node.js ${process.version}`, 'https://cdn.discordapp.com/emojis/475614309238702101.png');

		if (!embed.color && msg.guild && msg.guild.me.displayColor) {
			embed.setColor(msg.guild.me.displayColor);
		}
		return embed;
	},

	execute(msg) {
		try {
			const file = readFileSync('./yarn.lock', 'utf8');
			const dependencies = lockfile.parse(file).object;
			const discordJS = dependencies['discord.js@discordjs/discord.js#11.5-dev'];
			return msg.channel.send(this.buildInfoEmbed(discordJS.resolved, msg));
		} catch (_) {
			const lock = require('../package-lock.json');
			const discordJS = lock.dependencies['discord.js'].version;
			return msg.channel.send(this.buildInfoEmbed(discordJS, msg));
		}
	}
};
