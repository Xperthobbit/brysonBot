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
    client.user.setActivity(`code guides. v${version}`, {type: 'WATCHING'}).catch(console.error);
    console.log("Servers deployed in:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
    })
    console.log(' ');
    console.log('Ready for tasking!')
})

client.on("disconnected", () => {
    console.log("Disconnected!");
    console.log("Reconnecting...");
	client.login(token);
});

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
                message.reply(`I was made by ${author}! My Github repo is: https://github.com/Xperthobbit/brysonBot`)
            }
        break;
        //Version functions
        case 'github':
            message.reply('Here is my git repo: https://github.com/Xperthobbit/brysonBot')
        break;
        case 'version':
            message.channel.send(`Currently, I am on version ${version}`)
        break;
        //Clearing chat function 
        case 'clear':
            if(!args[1]) return message.reply('Please define how many messages you want cleared!')
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Sorry, you need to have permisson: MANAGE_MESSAGES. :frown:')
            //if(!message.member.roles.find(r => r.name === "Role_name_here")) return message.reply('Sorry, you need to have the role: "role_name_here". :frown:')
            message.channel.bulkDelete(args[1]);
        break;
        //Testing the embed func
        case 'embedtest':
            const embed = new Discord.RichEmbed()
            .setColor(0x5eeb34) //Hex color requires '0x' and then the number
            .setTitle('Discord Information:')
            .addField('Username', message.author.username)
            .setThumbnail(message.author.avatarURL)
            .setFooter('Discord Embed Test')
            message.channel.send(embed);
        break;
        //Print 4Head emote function
        case '4head':
            const attachment = new Attachment('https://www.sccpre.cat/png/big/13/139450_4head-png.png')
            message.channel.send(message.author, attachment);
        break;
        //Voting function
        case 'vote':
            const pp = new Object()
            message.channel.send('Please react ✅ or ❌ to the following question!')
            message.react('✅')
            message.react('❌')
        break;
        case 'CPA':
            let Role = message.guild.roles.find(role => role.name === "CPA"); 
        if (message.member.roles.has(Role.id)){
            return message.reply("Sorry you already have that role!")
        }else{
            const embed2 = new Discord.RichEmbed()
            .setColor(0x5d2079) 
            .addField('Username', message.author.username)
            .addField("You've been given the CPA Role!", "Congrats!")
            .setThumbnail(message.author.avatarURL)
            message.member.addRole(Role);
            message.reply(embed2);
        }
        break;
    }
})

client.login(token);