const ms = require("ms");
const { MessageEmbed } = require("discord.js");

const { MESSAGES } = require("../../util/constants");

module.exports.help = MESSAGES.COMMANDS.MODERATION.MUTE;

module.exports.run = async ( client, message, args ) => {
    await message.delete();
    
    let user = message.guild.member(message.mentions.users.first());

    let muteTime = '60s';
    if( args[1] && typeof( ms( args[1] ) ) === 'number' ) muteTime = args[1];

    let muteRole = message.guild.roles.cache.find( role => role.name === 'muted' );

    if( !muteRole ) {
        muteRole = await message.guild.roles.create({
            data: {
                name: 'muted',
                color: '#000',
                permissions: [],
            }
        });
    }

    message.guild.channels.cache.forEach( async ( channel, id ) => {
        await channel.updateOverwrite( muteRole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            CONNECT: false,
        });
    });

    await user.roles.add( muteRole.id );
    await user.voice.kick();

    message.channel.send(`<@${user.id}> est mute pour ${ms(ms(muteTime))}.`).then(msg => {
        setTimeout(() => msg.delete(), 3000)
    });

    const embed = new MessageEmbed()
        .setAuthor( `${user.user.username} ${user.user.id}`, user.user.displayAvatarURL() )
        .setColor("#FF0000")
        .setDescription(`**Action**: mute\n**Durée**: ${muteTime}`)
        .setTimestamp()
        .setFooter( message.author.username, message.author.avatarURL() );

    let guild = await client.getGuild(message.guild);
    
    message.guild.channels.cache.find( c => c.id = guild.logChannel ).send(embed);

    setTimeout( () => { user.roles.remove( muteRole.id ); }, ms(muteTime) );
};