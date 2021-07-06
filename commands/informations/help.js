const { MessageEmbed } = require("discord.js");
const { PREFIX       } = require("../../../config");
const { readdirSync  } = require("fs");

const categoryList = readdirSync('./commands');

module.exports.help = {
    name: 'help',
    aliases: ['help', 'h', 'aide'],
    category: 'informations',
    description: 'Renvoie une liste de commandes avec leurs informations.',
    cooldown: 0,
    usage: '<command_name>',
    isuserAdmin: false,
    permissions: false,
    args: false,
};

module.exports.run = ( client, message, args ) => {
    if( !args.length ) {
        const embed = new MessageEmbed()
            .setColor("#36393f")
            .addField("Liste des commandes", `Une liste de toutes les sous-catégories disponibles et leurs commandes\n
                Pour plus d'informations sur une commande, tapez \`${PREFIX}help <command_name>\``);
        
        for( const category of categoryList ) {
            embed.addField(
                `${category}`,
                `${client.commands.filter( cat => cat.help.category === category.toLowerCase() ).map( cmd => cmd.help.name ).join(', ')}`
            );
        };

        return message.channel.send(embed);
    }
    else {
        const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));

        const embed = new MessageEmbed()
            .setColor("#36393f")
            .setTitle(`- ${command.help.name} -`)
            .addField("Description", `${command.help.description}`)
            .addField("Utilisation", command.help.usage ? `${PREFIX}${command.help.name} ${command.help.usage}` : `${PREFIX}${command.help.name}`, true)
        
        if( command.help.aliases.length > 1 ) embed.addField("Alias", `${command.help.aliases.join(', ')}`, true);

        return message.channel.send(embed);
    }
};