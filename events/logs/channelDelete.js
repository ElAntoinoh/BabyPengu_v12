const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'channelDelete',

    async execute( channel, client ) {
        const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: 'CHANNEL_DELETE',
        });

        const LatestChannelDeleted = fetchGuildAuditLogs.entries.first();

        const { executor } = LatestChannelDeleted;

        if( executor.bot ) return;

        const embed = new MessageEmbed()
            .setAuthor("Suppression d'un salon")
            .setColor("#0000FF")
            .setDescription(`**Action**: suppression d'un salon\n**Nom**: ${channel.name}`)
            .setTimestamp()
            .setFooter( executor.username, executor.displayAvatarURL() );

        let guild = await client.getGuild(channel.guild);

        channel.guild.channels.cache.find( c => c.id = guild.logChannel ).send(embed);
    },
};