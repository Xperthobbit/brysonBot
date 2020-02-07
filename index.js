const Discord = require('discord.js');
const { Client, Attachment } = require('discord.js');
const { prefix, token } = require('./config.json');
const { version, author } = require('./package.json');
const client = new Discord.Client();

client.once('ready', () => {
  console.log(' ');
  console.log('Established connection successfully.');
  console.log(' ');
  console.log('Bot name: ' + client.user.tag);
  client.user.setActivity(`code guides. v${version}`, { type: 'WATCHING' }).catch(console.error);
  console.log('Servers deployed in:');
  client.guilds.forEach(guild => {
    console.log(' - ' + guild.name);
  });
  console.log(' ');
  console.log(`Version: ${version}`);
  console.log('Ready for tasking!');
});

client.on('guildCreate', guild => {
  console.log(
    `New Server joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
  );
  client.user.setActivity(`Currently active in ${client.guilds.size} servers`);
});

client.on('guildDelete', guild => {
  console.log(`I have been kicked from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Currently active in ${client.guilds.size} servers`);
});

client.on('disconnected', () => {
  console.log('Disconnected!');
  console.log('Reconnecting...');
  client.login(token);
});

//const prefix = '!' <- Located in my config.json

client.on('message', message => {
  let args = message.content.substring(`${prefix}`.length).split(' ');

  if (message.content.indexOf(`${prefix}`) !== 0) return;

  switch (args[0]) {
    case 'ping':
      message.channel.send('Pong!');
      //message.channel.send for just saying without @ing
      break;
    case 'info':
      if (args[1] === 'version') {
        message.channel.send(`Currently, I am on version ${version}`);
      } else {
        message.reply(
          `I was made by ${author}! My Github repo is: https://github.com/Xperthobbit/brysonBot`
        );
      }
      break;
    //Version functions
    case 'github':
      message.reply('Here is my git repo: https://github.com/Xperthobbit/brysonBot');
      break;
    case 'version':
      message.channel.send(`Currently, I am on version ${version}`);
      break;
    //Clearing chat function
    case 'clear':
      if (!args[1] || args[1] < 2 || args[1] > 100)
        return message.reply('Please define how many messages you want cleared!(Max 100!)');
      if (!message.member.hasPermission('MANAGE_MESSAGES'))
        return message.reply('Sorry, you need to have permisson: MANAGE_MESSAGES. :frown:');
      message.channel
        .bulkDelete(args[1])
        .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
      break;
    case 'vote':
      const sayMessage1 = args.join(' ').slice(4);
      message.delete().catch(owo => {});
      const voting = new Discord.RichEmbed()
        .setTitle('Please vote on the following question with ✅ or ❌')
        .setDescription(sayMessage1)
        .setColor('BLUE');
      message.channel.send(voting);
      break;
    case 'CPA':
    case 'CPD':
      let Role = message.guild.roles.find(role => role.name === 'CPA/D');
      if (!Role) {
        return message.reply(
          `Sorry. This server does not have 'CPA/D' as a role... Talk to the server owner!`
        );
      }
      if (message.member.roles.has(Role.id)) {
        return message.reply('Sorry you already have that role!');
      } else {
        const embed2 = new Discord.RichEmbed()
          .setColor(0x5d2079)
          .addField('Username:', message.author.username)
          .setDescription("You've been given the CPA/D Role!")
          .setTimestamp()
          .setThumbnail(message.author.avatarURL);
        message.member.addRole(Role);
        message.reply(embed2);
      }
      break;
    case 'codify':
      const sayMessage = args.join(' ').slice(7);
      if (message.author.bot) {
        return;
      } else if (!args[1] || args[1].length === 0) {
        message.delete().catch(owo => {});
        return message.reply('Please provide the code!  :robot:');
      } else {
        message.delete().catch(owo => {});
        message.reply(' here is your codified code! :robot:');
        message.channel.sendCode('c++', sayMessage);
      }
      break;
    case 'members':
      var list = [];
      message.guild.members.forEach(member => list.push(member.user.username));
      list.sort();
      message.reply(`Total members: ${message.guild.memberCount}`);
      const embed4 = new Discord.RichEmbed()
        .setColor(0xf5b041)
        .setTitle('Member List:')
        .setDescription(list);
      message.channel.send(embed4).catch(owo => {});
      break;
    case 'commands':
    case 'cmds':
      var listCommands = [
        'members',
        'codify',
        'CPA',
        'CPD',
        'vote',
        'clear',
        'version',
        'github',
        'info',
        'ping'
      ]; // There's gotta be an easier way to find all the cases...
      listCommands.sort();
      const embed5 = new Discord.RichEmbed()
        .setColor(0x884ea0)
        .setTitle('Commands:')
        .setDescription(listCommands);
      message.channel.send(embed5).catch(owo => {});
  }
});

//This is for the voting command. Pls ignore.
client.on('message', message => {
  if (message.author.bot) {
    if (message.embeds) {
      const vote = message.embeds.find(
        msg => msg.title === 'Please vote on the following question with ✅ or ❌'
      );
      if (vote) {
        vote.message
          .react('✅')
          .then(vote.message.react('❌'))
          .catch(err => console.error);
      }
    }
    return;
  }
});

client.login(token);
