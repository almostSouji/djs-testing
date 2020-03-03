/* eslint-disable @typescript-eslint/no-unused-vars */
import { Message } from 'discord.js';

interface CommandOptions {
	aliases?: string[];
	description?: string;
	ownerOnly?: boolean;
}

export abstract class Command {
	public id: string;
	public aliases: string[];
	public ownerOnly: boolean;
	public description: string;
	public constructor(id: string, data?: CommandOptions) {
		this.id = id;
		this.aliases = data?.aliases ?? [];
		this.description = data?.description ?? '';
		this.ownerOnly = data?.ownerOnly ?? true;
	}

	public abstract async execute(message: Message, args: string[]): Promise<void | Message>;
}
