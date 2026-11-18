const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Slap another user!')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The user you want to slap')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Why are you slapping them?')
                .setRequired(false)),

    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');
        const sender = interaction.user;

        // Prevent self-slapping or bot-slapping edge cases if desired
        if (target.id === sender.id) {
            return interaction.reply({ content: "Why are you hitting yourself?!", ephemeral: true });
        }

        // Array of slap GIFs
        const slapGifs = [
            'https://media.giphy.com/media/Gf3AUz3eBNbTW/giphy.gif',
            'https://media.giphy.com/media/Zau0yrl17uzdK/giphy.gif',
            'https://media.giphy.com/media/jLeyZWgtwgr2U/giphy.gif',
            'https://media.giphy.com/media/RXGNsyRb1hDJm/giphy.gif'
        ];
        const randomGif = slapGifs[Math.floor(Math.random() * slapGifs.length)];

        // Format the message
        let description = `**${sender.username}** slapped **${target.username}**!`;
        if (reason) {
            description += `\n*Reason: ${reason}*`;
        }

        const slapEmbed = new EmbedBuilder()
            .setColor('#FF4500')
            .setDescription(description)
            .setImage(randomGif)
            .setTimestamp();

        await interaction.reply({ embeds: [slapEmbed] });
    },
};
