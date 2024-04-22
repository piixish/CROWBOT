const Discord = require("discord.js");
const db = require('quick.db');
const cl = new db.table("Color");
const fs = require('fs');
const config = require("../config");

module.exports = {
    name: 'pic',
    usage: 'avatar',
    description: `Afficher l'avatar de quelqu'un.`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`);
        if (color == null) color = config.app.color;

        let member;
        if (!args[0]) {
            member = message.author;
        } else {
            try {
                member = await client.users.fetch(args[0]);
            } catch (e) {
                member = message.author;
            }
        }

        let avatar = member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });

        const embed = new Discord.MessageEmbed()
            .setTitle(`Avatar URL`)
            .setURL(avatar)
            .setImage(avatar)
            .setFooter(`Avatar de ${member.username}`, member.displayAvatarURL())
            .setColor(color);

        message.channel.send({ embeds: [embed] });
    }
};
