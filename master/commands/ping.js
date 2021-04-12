module.exports = {
	name: 'ping',
	description: 'ping',
	aliases: ['ping', 'pong'],
	ownerOnly: true,
	async execute(msg) {
		const ping = await msg.answer('awaiting ping...');
		ping.edit(`✓ pong! Api Latency is ${ping.createdTimestamp - msg.createdTimestamp}ms. Av. Heartbeat is ${Math.round(msg.client.ws.ping)}ms.`);
	}
};
