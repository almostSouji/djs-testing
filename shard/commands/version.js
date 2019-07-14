const { stripIndents } = require('common-tags');
const lockfile = require('@yarnpkg/lockfile');
const djs = require('discord.js');
const { readFileSync } = require('fs');


module.exports = {
	name: 'version',
	description: 'versioncmd',
	aliases: ['v', 'ver', 'commit'],
	ownerOnly: true,
	buildInfoEmbed(_, msg) {
		const embed = new djs.RichEmbed()
			.setThumbnail(msg.client.user.displayAvatarURL)
			.addField(`Library: Discord.js: ${djs.version}`, stripIndents`Commithash: \`stable\`
					[view on GitHub](https://github.com/discordjs/discord.js/)`)
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
			const discordJS = dependencies['discord.js@^11.4.2'];
			return msg.channel.send(this.buildInfoEmbed(discordJS.resolved, msg));
		} catch (_) {
			const lock = require('../package-lock.json');
			const discordJS = lock.dependencies['discord.js'].version;
			return msg.channel.send(this.buildInfoEmbed(discordJS, msg));
		}
	}
};
