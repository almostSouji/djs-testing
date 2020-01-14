const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

module.exports = {
	name: 'update',
	description: 'update',
	aliases: ['up', 'upgrade', 'commit'],
	ownerOnly: true,
	async execute(msg) {
		msg.channel.send('Updating...');
		try {
			const res = await exec('yarn upgrade');
			console.log(res);
			msg.channel.send('Updated!');
		} catch (err) {
			console.error(err);
			msg.channel.send('Something went wrong, check console');
		}
	}
};
