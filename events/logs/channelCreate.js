const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'channelCreate',

    async execute( channel, client ) {
        if( channel.type === "dm" ) return;
        
        const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: 'CHANNEL_CREATE',
        });

        const LatestChannelCreated = fetchGuildAuditLogs.entries.first();

        const { executor } = LatestChannelCreated;

        if( executor.bot ) return;

        const embed = new MessageEmbed()
            .setAuthor("Création d'un nouveau salon")
            .setColor("#0000FF")
            .setDescription(`**Action**: création d'un salon\n**Nom**: ${channel.name}`)
            .setTimestamp()
            .setFooter( executor.username, executor.displayAvatarURL() );

        let guild = await client.getGuild(channel.guild);

        channel.guild.channels.cache.find( c => c.id = guild.logChannel ).send(embed);
    },
};