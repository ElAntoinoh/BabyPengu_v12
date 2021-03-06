const { MessageEmbed } = require("discord.js");

const { MESSAGES } = require("../../util/constants");

module.exports.help = MESSAGES.COMMANDS.MODERATION.KICK;

module.exports.run = async ( client, message, args ) => {
    const user = message.mentions.users.first();
    const reason = ( args.splice(1).join(' ') || "Pas de raison spécifiée" );

    user ? message.guild.member(user).kick(reason) : message.channel.send("L'utilisateur n'existe pas!");

    const embed = new MessageEmbed()
        .setAuthor( `${user.username} ${user.id}`, user.avatarURL() )
        .setColor("#FF0000")
        .setDescription(`**Action**: kick\n**Raison**: ${reason}`)
        .setTimestamp()
        .setFooter( message.author.username, message.author.avatarURL() );

    let guild = await client.getGuild(message.guild);
    
    message.guild.channels.cache.find( c => c.id = guild.logChannel ).send(embed);
};