import 'dotenv/config';
import 'reflect-metadata';
import { GatewayIntentBits } from 'discord.js';
import { Client, DIService, tsyringeDependencyRegistryEngine } from 'discordx';
import { container } from 'tsyringe';
import { importx } from '@discordx/importer';

const DISCORD_TOKEN = process.env.DISCORD_TOKEN || '';

const clientOptions = {
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
};

async function main() {
    DIService.engine = tsyringeDependencyRegistryEngine.setInjector(container);

    const client = new Client(clientOptions);
    container.registerInstance(Client, client);

    await importx(__dirname + '/{events,commands}/**/*.{ts,js}');
    await client.login(DISCORD_TOKEN);
}

main();
