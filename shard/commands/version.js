const { stripIndents } = require('common-tags');
const djs = require('discord.js');

module.exports = {
	name: 'version',
	description: 'versioncmd',
	aliases: ['v', 'ver', 'commit'],
	ownerOnly: true,
	buildInfoEmbed(msg) {
		const embed = new djs.MessageEmbed()
			.addField(`Library: Discord.js: ${djs.version}`, stripIndents`[view on GitHub](https://github.com/discordjs/discord.js/tree/${djs.version})`)
			.setFooter(`Node.js ${process.version}`, 'https://cdn.discordapp.com/emojis/475614309238702101.png');

		if (!embed.color && msg.guild && msg.guild.me.displayColor) {
			embed.setColor(msg.guild.me.displayColor);
		}
		return embed;
	},

	execute(msg) {
		return msg.channel.send(this.buildInfoEmbed(msg));
	}
};
