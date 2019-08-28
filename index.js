const Discord = require('discord.js');
const {Client, Attachment} = require('discord.js');
const {prefix, token} = require('./config.json');
const {version, author} = require('./package.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log(' ');
    console.log('Established connection successfully.');
    console.log(' ');
    console.log('Bot name: ' + client.user.tag);
    client.user.setActivity(`code guides. Ver:${version}`, {type: 'WATCHING'}).catch(console.error);
    console.log("Servers deployed in:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
    })
    console.log(' ');
    console.log('Ready for tasking!')
})

//const prefix = '!' <- Located in my config.json

client.on('message', message=> {

    let args = message.content.substring(`${prefix}`.length).split(" ");

    switch (args[0]){
        case 'ping':
            message.reply('pong!');
            //message.channel.send for just saying without @ing
        break;
        case 'info':
            if(args[1] === 'version'){
                message.channel.send(`Currently, I am on version ${version}`)
            }else{
                message.reply(`I was made by ${author}`)
            }
        break;
        case 'version':
            message.channel.send(`Currently, I am on version ${version}`)
        break;
        case 'clear':
            if(!args[1]) return message.reply('Please define how many messages you want cleared!')
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Sorry, you need to have permisson: MANAGE_MESSAGES. :frown:')
            message.channel.bulkDelete(args[1]);
        break;
        case 'embedtest':
            const embed = new Discord.RichEmbed()
            .setColor(0x5eeb34) //Hex color requires '0x' and then the number
            .setTitle('Discord Information:')
            .addField('Username', message.author.username)
            .setThumbnail(message.author.avatarURL)
            .setFooter('Discord Embed Test')
            message.channel.send(embed);
        break;
        case '4head':
            const attachment = new Attachment('https://www.sccpre.cat/png/big/13/139450_4head-png.png')
            message.channel.send(message.author, attachment);
        break;
        case 'vote':
            const pp = new Object()
            message.channel.send('Please react ✅ or ❌ to the following question!')
            message.react('✅')
            message.react('❌')
        break;
    }
})

client.login(token);