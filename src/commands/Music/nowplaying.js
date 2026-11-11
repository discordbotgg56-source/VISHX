import { SlashCommandBuilder } from 'discord.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';
import { buildNowPlayingReply } from '../../services/music/musicActions.js';
import { deferMusicCommand } from '../../services/music/prefixSupport.js';

export default {
    category: 'Music',
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Show the currently playing track'),

    async execute(interaction, config, client) {
        // Pass the ephemeral option into your prefix/defer support helper
        await deferMusicCommand(interaction, { ephemeral: true });
        
        const payload = buildNowPlayingReply(client, interaction.guild.id);
        await InteractionHelper.safeEditReply(interaction, payload);
    },
};
