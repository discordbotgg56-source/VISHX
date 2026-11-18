const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fuck')
        .setDescription('Get dramatically romantic (or chaotic) with another user!')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The lucky (or unlucky) user')
                .setRequired(true)),

    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const sender = interaction.user;

        if (target.id === sender.id) {
            return interaction.reply({ 
                content: "Self-love is important, just keep it out of the general chat!", 
                ephemeral: true 
            });
        }

        const scenarios = [
            `**${sender.username}** took **${target.username}** out for a candlelit dinner at McDonald's. Romance isn't dead.`,
            `**${sender.username}** and **${target.username}** locked eyes across the voice channel and immediately eloped to Vegas.`,
            `**${sender.username}** aggressively serenaded **${target.username}** with a kazoo.`,
            `**${sender.username}** gave **${target.username}** *the look*. The server is now rated PG-13.`,
            `**${sender.username}** tried to make a move on **${target.username}**, but tripped over their own shoelaces.`
        ];

        const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];

        const gifs = [
            'https://media.giphy.com/media/10UUe8ZsLnaqwo/giphy.gif',
            'https://media.giphy.com/media/l4pTdcifPZLpDjL1e/giphy.gif',
            'https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif'
        ];
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

        const embed = new EmbedBuilder()
            .setColor('#FF69B4')
            .setDescription(`🔥 ${randomScenario}`)
            .setImage(randomGif)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
