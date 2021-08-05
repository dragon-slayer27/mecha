const Discord = require('discord.js')
const client = new Discord.Client()

const express = require('express')
const app = express()

const config = require('./config.json')
const command = require('./command')
const firstMessage = require('./first-message')
const privateMessage = require('./Private-message')
const { prefix } = require('./config.json')

app.get("/", (req, res) => {
  res.send("hello DS!")
})

app.listen(3000, () => {
  console.log("ready!")
})

client.on('ready', () =>{
    console.log('The Client is Ready!')

    command(client, ['ping', 'test'], message => {
        message.channel.send('Pong!')
    })

    command(client, 'servers', (message) => {
        if(message.member.id === "773555910152945684"){
        client.guilds.cache.forEach(guild => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members!`)
        })
        }
    })
    command(client, ['cc', 'clearchannel'], message => {
        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.messages.fetch().then(results => {
              message.channel.bulkDelete(results)
            })
        }
    })

     command(client, 'steal', (message) => {
       if(message.member.hasPermission("MANAGE_EMOJIS")){
        const content = message.content.replace(`${prefix}steal `, '')
        const emoji = Discord.Util.parseEmoji(content)
        if(emoji.id){
          const extention = emoji.animated ? ".gif" : ".png";
          const url = `https://cdn.discordapp.com/emojis/${emoji.id + extention}`
          message.guild.emojis.create(url,  emoji.name).then((emoji) => message.channel.send(`Added ${emoji} to this server!!`))
         }
         else{
           message.channel.send("Please include a emoji, ya noob!")
         }
       }

    })

    command(client, 'status', message => {
        if(message.member.id === "773555910152945684" || message.member.id === '764123180691750933'){
      const content = message.content.replace(`${prefix}status `, '')
      client.user.setPresence({
          activity: {
              name: content,
              type: 0,
          }
      })
    }
  })

  command(client, 'createtext', message => {
    const name = message.content.replace(`${prefix}createtext `, '')

    message.guild.channels
    .create(name, {
      type: 'text'
    }).then(channel => {})
  })

  command(client, 'createvoice', message => {
    const name = message.content.replace(`${prefix}createvoice `, '')

    message.guild.channels.create(name, {
      type: 'voice'
    }).then(channel => { 
      channel.setUserLimit(10)
    })

  })

  command(client, 'support', message => {

    const botimage = 'https://www.logogenie.net/download/preview/engine/9551028'

    const supportembed = new Discord.MessageEmbed()
     .setTitle('click this link for the discord support server')
     .setURL('https://discord.io/DSden')
     .setAuthor(message.author.username)
     .setThumbnail(botimage)
     .setFooter('DS den', botimage)
     .setColor("RANDOM")

     message.channel.send(supportembed)

  })

  command(client, 'serverinfo', message => {

   const { guild } = message

   const { name, region, memberCount, afkTimeout, createdAt, description, afkChannel, explicitContentFilter, partnered, premiumSubscriptionCount, premiumTier } = guild
   const icon = guild.iconURL()

   const serverinfoEmbed = new Discord.MessageEmbed()
    .setTitle(`Server info for "${name}"`)
    .setThumbnail(icon)
    .addFields({
      name: 'Region',
      value: region,
    },{
      name: 'Members',
      value: memberCount,
    },{
      name: 'server created at',
      value: createdAt,
    },{
      name: 'AFK timeout',
      value: `${afkTimeout / 60} minutes`,
    },{
      name: 'server description',
      value: description,
    },{
      name: 'name of afk channel',
      value: afkChannel,
    },{
      name: 'explicit content filter level',
      value: explicitContentFilter,
    },{
      name: 'Partnered',
      value: partnered,
    },{
      name: 'Number of Boosts',
      value: premiumSubscriptionCount,
    },{
      name: 'server boost level',
      value: premiumTier,
    })


    message.channel.send(serverinfoEmbed)

  })

  privateMessage(client, `${prefix}invite`, 'invite me by the following link: \n \n https://discord.com/api/oauth2/authorize?client_id=864797049438470164&permissions=8&scope=bot')

  firstMessage(client, '844479668102627348', "1-Common sense \n Members should strive for a certain level of quality in their messages, each channel has a topic and purpose that should be respected. Single word/letter/emoji messages, text walls, excessive use of caps/spoilers/mentions, excessive media dumping, attempting to bypass or trigger automod & filters and encouraging others to break rules is disallowed. \n 2—Inappropriate content \n Disturbing, explicit, NSFW content is strictly prohibited in any way, shape or form. This includes your profile picture, status and emojis you use and will result in long term mute from the server without any warning. \n 3—Harassment & bullying \n Verbally harassing someone with the intent to upset or anger them by being disrespectful/offensive/attacking, swearing or bringing up past events that the user doesn’t want to have brought up is disallowed. \n 4—Order & peace \n Purposefully attempting to disturb peace in the server by starting controversial discussions, drama, spamming, advertising, mass mentioning, earraping, abusing or obstructing bots, commands or services is heavily discouraged. \n 5—Advertising \n Self-advertising is only allowed to a certain extent in therefore designated channels. You are allowed to advertise your social media, such as your YouTube account, but are in no way allowed to advertise other  paid services or attempt to recruit members from this server. \n 6—Discord Terms of Service  —> https://discord.com/guidelines \n Violation of the Discord ToS in any way, shape or form will result in you getting kicked from our server, such violations are distributing malicious, pirated or illegal content, websites or software or not meeting the age requirement of 13. \n 7-While our staff have a general guideline to follow,they do reserve the right to moderate at own discretion, regardless of any rule listed above please do not intervene while staff members are doing their job. \n 8-don't ping the staff without any genuine reason.", ['🆗', '📜' ] )

})

client.login(process.env.token)
