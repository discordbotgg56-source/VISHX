const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kill')
        .setDescription('Eliminate another user in a dramatic, cartoonish way!')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The user you want to eliminate')
                .setRequired(true)),

    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const sender = interaction.user;

        if (target.id === sender.id) {
            return interaction.reply({ 
                content: "You tried to eliminate yourself, but tripped over a rubber duck instead.", 
                ephemeral: true 
            });
        }

        // Playful, game-style elimination messages
        const scenarios = [
            `**${sender.username}** dropped an anvil on **${target.username}**.`,
            `**${target.username}** was ejected by **${sender.username}**. *(1 Impostor remains)*`,
            `**${sender.username}** challenged **${target.username}** to a duel and won with a rubber chicken.`,
            `**${target.username}** fell into a pit of lava while running away from **${sender.username}**.`,
            `**${sender.username}** hit **${target.username}** with a blue shell right before the finish line.`,
            `**${target.username}** was deleted from the server matrix by **${sender.username}**.`
        ];

        const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];

        // Optional cartoon/game "Wasted" or knockout GIFs
        const gifs = [
            'https://media.giphy.com/media/J2ChE2Fwdzyg3Bu6xf/giphy.gif',
            'https://media.giphy.com/media/1332tmUf9Myo4o/giphy.gif',
            'https://media.giphy.com/media/e37rJnOap14aUrqt0B/giphy.gif'
        ];
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

        const killEmbed = new EmbedBuilder()
            .setColor('#DC143C')
            .setDescription(`💀 ${randomScenario}`)
            .setImage(randomGif)
            .setTimestamp();

        await interaction.reply({ embeds: [killEmbed] });
    },
};
