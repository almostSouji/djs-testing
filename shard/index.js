require('dotenv').config();

const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: process.env.TOKEN, shardList: [0, 1], totalShards: 2 });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();
