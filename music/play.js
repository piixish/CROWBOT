const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const config = require("../config")
const { Player, QueryType } = require('discord-player');
const emote = require('../emotes.json')

module.exports = {
    name: 'play',
    usage: 'play',
    category: "owner",
    description: `Music`,
    async run(interaction) {
        const channel = interaction.member.voice.channel;
        const args = interaction.options.getString('music');

        const embed = new MessageEmbed()
            .setColor(interaction.client.config.clients.embedColor)
            .setTimestamp()
            .setFooter(client.config.clients.name, client.config.clients.logo);

        try {
            const { track } = await interaction.client.player.play(channel, args, {
                metadata: interaction, // nodeOptions should be directly passed here, not under nodeOptions
            });

            return interaction.followUp({ embeds: [embed.setDescription(`✅ | La musique **${track.title}** a bien été trouvée 🔊`)] });
        } catch (e) {
            return interaction.followUp({ embeds: [embed.setDescription(`Une erreur est survenue : ${e}`)] });
        }
    }
}