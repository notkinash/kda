import { Discord, Slash } from 'discordx';
import { Category } from '@discordx/utilities';
import { CommandInteraction } from 'discord.js';

@Discord()
@Category('Utilities')
export default class InviteCommand {
    @Slash({
        name: 'invite',
        description: 'Link to invite this bot to your server.'
    })
    async inviteCommand(interaction: CommandInteraction) {
        await interaction.reply({
            content: `${interaction.member} https://discord.com/oauth2/authorize?client_id=1080096519648182292&permissions=277025769536&scope=bot%20applications.commands`
        });
    }
}