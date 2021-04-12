const { stripIndents } = require('common-tags');
const djs = require('discord.js');

module.exports = {
	name: 'version',
	description: 'versioncmd',
	aliases: ['v', 'ver', 'commit'],
	ownerOnly: true,
	buildInfoEmbed(discordJS, msg) {
		const hashReg = /(?:tar.gz\/|#)(\w+)/;
		const djsHash = discordJS.match(hashReg)[1];
		const embed = new djs.MessageEmbed()
			.addField(`Library: Discord.js: ${djs.version} [MAIN BRANCH]`, stripIndents`Commithash: \`${djsHash}\`
					[view on GitHub](https://github.com/discordjs/discord.js/commit/${djsHash})`)
			.setFooter(`Node.js ${process.version}`, 'https://cdn.discordapp.com/emojis/475614309238702101.png');

		if (!embed.color && msg.guild && msg.guild.me.displayColor) {
			embed.setColor(msg.guild.me.displayColor);
		}
		return embed;
	},

	execute(msg) {
		const lock = require('../package-lock.json');
		const discordJS = lock.dependencies['discord.js'].version;
		return msg.answer(this.buildInfoEmbed(discordJS, msg));
	}
};
