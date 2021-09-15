const { MESSAGES } = require("../../util/constants");

module.exports.help = MESSAGES.COMMANDS.COLLECTORS.MSGCOLLECTOR;

module.exports.run = ( client, message, args ) => {
    const filter = msg => msg.content.includes(args[0]);
    const collector = message.channel.createMessageCollector( filter, { time: 10000 } );
    
    /*message.channel.send(`Tapez ${args[0]} afin de pouvoir entrer dans le jeu`)
        .then(() => {
            message.channel.createMessageCollector( filter, { time: 10000 })
                .then(collected => { message.channel.send(`${collected.size - 1} messages collectés`); } );
        });*/

    collector.on('end', collected => {
        message.channel.send(`${collected.size} messages collectés`);
    });
};