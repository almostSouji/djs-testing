import { Command } from './structures/command';

declare namespace NodeJS {
	export interface ProcessEnv {
		PREFIX: string;
		OWNER: string;
		TOKEN: string;
	}
}

declare module 'discord.js' {
	interface Client {
		commands: Collection<string, Command>;
	}
}
