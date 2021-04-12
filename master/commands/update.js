const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

module.exports = {
	name: 'update',
	description: 'update',
	aliases: ['up', 'upgrade', 'commit'],
	ownerOnly: true,
	async execute(msg) {
		msg.answer('Updating...');
		try {
			const res = await exec('npm upgrade');
			console.log(res);
			msg.answer('Updated!');
		} catch (err) {
			console.error(err);
			msg.answer('Something went wrong, check console');
		}
	}
};
