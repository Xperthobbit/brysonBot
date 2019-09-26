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
    console.log(`Version: ${version}`)
    console.log('Ready for tasking!')
})

client.on("guildCreate", guild => {
    console.log(`New Server joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Currently active in ${client.guilds.size} servers`);
  });
  
client.on("guildDelete", guild => {
    console.log(`I have been kicked from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Currently active in ${client.guilds.size} servers`);
  });

client.on("disconnected", () => {
    console.log("Disconnected!");
    console.log("Reconnecting...");
	client.login(token);
});

//const prefix = '!' <- Located in my config.json

client.on('message', message=> {

    let args = message.content.substring(`${prefix}`.length).split(" ");
    
    if(message.content.indexOf(`${prefix}`) !== 0) return;

    switch (args[0]){
        case 'ping':
        message.channel.send('Pong!')
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
            if(!args[1] || args[1] < 2 || args[1] > 100) return message.reply('Please define how many messages you want cleared!(Max 100!)')
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Sorry, you need to have permisson: MANAGE_MESSAGES. :frown:')
            //if(!message.member.roles.find(r => r.name === "Role_name_here")) return message.reply('Sorry, you need to have the role: "role_name_here". :frown:')
            message.channel.bulkDelete(args[1])
                .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
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
        case 'vote':
            const sayMessage1 = args.join(" ").slice(4);
            message.delete().catch(owo=>{});
            const voting = new Discord.RichEmbed()
            .setTitle("Please vote on the following question with ✅ or ❌")
            .setDescription(sayMessage1)
            .setColor('BLUE');
            message.channel.send(voting)
        break;    
        case 'CPA':
        case 'cpa':
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
        case 'codify':
            const sayMessage = args.join(" ").slice(7);
            if (args[1] !== '#include' && args[2] !== '<stdio.h>'){
                message.delete().catch(owo=>{});
                return message.reply('Please provide the code starting with "#include <stdio.h>" :robot:')
            }else if(message.author.bot){
                return;
            }else{
                message.delete().catch(owo=>{});
                message.reply(' here is your codified code! :robot:')
                message.channel.sendCode('C', sayMessage)
        }
        break;
        case 'Minecraft':
        case 'minecraft':
        case 'status':
            message.delete().catch(owo=>{});
            var request = require("request");
            var mcIP = "cantfraglike.me";       //change me to your server's ip address!
            var url = "https://mcapi.us/server/status?ip=" + mcIP;
            request(url, function(err, response, body) {
                if(err){
                    console.log(err);
                    return msg.reply('Something went wrong... :robot:');
                }
            body = JSON.parse(body);
            var status = `Server: **${mcIP}** is currently __offline__. Probably down for maintenance...`;
            if(body.online) {
                status = `Server: **${mcIP}** is currently __online__! `;
                if(body.players.now){
                    status += ' ' + body.players.now + ' are playing right now!';
                    } else {
                    status += ' No one is playing right now...'
                }
            }
            const embed3 = new Discord.RichEmbed()
            .setColor(0x684dad)
            .setTitle('Minecraft Server Status:')
            .setFooter('Server hosted by Bryson', 'https://i.imgur.com/lDQnLfc.jpg')
            .setDescription(status)
            .setImage('https://mcapi.us/server/image?ip=cantfraglike.me')
            .addField('Status Requester:', message.author, true);
            message.channel.send(embed3);
            });
        break;
        }
});

//This is for the voting command. Pls ignore.
client.on('message', message=> {
    if (message.author.bot){

        if(message.embeds){

            const vote = message.embeds.find(msg => msg.title === 'Please vote on the following question with ✅ or ❌');
            if(vote){
                vote.message.react('✅')
                .then(vote.message.react('❌'))
                .catch(err => console.error);
            }

        }
        return;
    }
});


client.login(token);