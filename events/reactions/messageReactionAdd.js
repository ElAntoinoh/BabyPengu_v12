module.exports = {
    name: 'messageReactionAdd',

    async execute( messageReaction, user, client ) {
        const message = messageReaction.message;
        const member  = message.guild.members.cache.get( user.id );
        const channel = message.guild.channels.cache.find( c => c.id === messageReaction.channel );

        const emoji = messageReaction.emoji.name;

        const blueRole   = message.guild.roles.cache.get("860646890621108275");
        const orangeRole = message.guild.roles.cache.get("860631983573958676");
        const memberRole = message.guild.roles.cache.get("861944147530874920");

        if( user.bot ) return;

        if( messageReaction.partial ) {
            await messageReaction.fetch();
            return;
        }

        if( ["π΅", "π ", "drapeauChybre"] .includes(emoji) && message.channel.id === channel.id ) {
            switch(emoji) {
                case "π΅":
                    member.roles.add(blueRole);
                    break;
                case "π ":
                    member.roles.add(orangeRole);
                    break;
                case "drapeauChybre":
                    member.roles.add(memberRole);
                    break;
            };
        };

        if( emoji === 'π₯' ) message.delete();
        if( emoji === 'π©' ) message.reactions.removeAll();
        if( emoji === 'π¦' ) message.channel.send("Je suis un carrΓ©e bleu !");
    },
};