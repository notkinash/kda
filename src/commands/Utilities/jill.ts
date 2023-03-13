import { Discord, Slash, SlashOption } from 'discordx';
import { Category } from '@discordx/utilities';
import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';

@Discord()
@Category('Utilities')
export default class JillCommand {
    @Slash({
        name: 'jill',
        description: 'Jill#8928 functions. Fixes Twitter, Instagram and TikTok embeds for Discord.'
    })
    async jillCommand(
        @SlashOption({
            name: 'url',
            description: 'post url',
            required: true,
            type: ApplicationCommandOptionType.String
        })
        urlString: string,
        interaction: CommandInteraction
    ) {
        const url = new URL(urlString);
        await interaction.reply({
            content: `${interaction.member} https://` + this.fixHostName(url.hostname) + url.pathname
        });
    }

    private fixInstagramHostName(hostname: string): string {
        return hostname === 'instagram.com' || hostname === 'www.instagram.com' ? 'ddinstagram.com' : hostname;
    }

    private fixTwitterHostName(hostname: string): string {
        return hostname === 'twitter.com' || hostname === 'www.twitter.com' ? 'fxtwitter.com' : hostname;
    }

    private fixTikTokHostName(hostname: string): string {
        return hostname === 'tiktok.com' || hostname === 'www.tiktok.com'
            ? 'vxtiktok.com'
            : hostname.endsWith('.tiktok.com')
            ? hostname.replace('.tiktok.com', '.vxtiktok.com')
            : hostname;
    }

    private fixHostName(hostname: string): string {
        return this.fixTikTokHostName(this.fixInstagramHostName(this.fixTwitterHostName(hostname)));
    }
}
