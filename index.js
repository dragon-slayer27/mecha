const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')
const firstMessage = require('./first-message')

client.on('ready', () =>{
    console.log('The Client is Ready!')

    command(client, ['ping', 'test'], message => {
        message.channel.send('Pong!')
    })

    command(client, 'servers', (message) => {
        client.guilds.cache.forEach(guild => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members!`)
        })
    })
    command(client, ['cc', 'clearchannel'], message => {
        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.messages.fetch().then(results => {
              message.channel.bulkDelete(results)
            })
        }
    })
    command(client, 'status', message => {
        if(message.member.id === "773555910152945684" || message.member.id === '764123180691750933'){
      const content = message.content.replace('m!status', '')

      client.user.setPresence({
          activity: {
              name: content,
              type: 0,
          }
      })
    }
  })

  firstMessage(client, '844479668102627348', "1-Common sense \n Members should strive for a certain level of quality in their messages, each channel has a topic and purpose that should be respected. Single word/letter/emoji messages, text walls, excessive use of caps/spoilers/mentions, excessive media dumping, attempting to bypass or trigger automod & filters and encouraging others to break rules is disallowed. \n 2—Inappropriate content \n Disturbing, explicit, NSFW content is strictly prohibited in any way, shape or form. This includes your profile picture, status and emojis you use and will result in long term mute from the server without any warning. \n 3—Harassment & bullying \n Verbally harassing someone with the intent to upset or anger them by being disrespectful/offensive/attacking, swearing or bringing up past events that the user doesn’t want to have brought up is disallowed. \n 4—Order & peace \n Purposefully attempting to disturb peace in the server by starting controversial discussions, drama, spamming, advertising, mass mentioning, earraping, abusing or obstructing bots, commands or services is heavily discouraged. \n 5—Advertising \n Self-advertising is only allowed to a certain extent in therefore designated channels. You are allowed to advertise your social media, such as your YouTube account, but are in no way allowed to advertise other  paid services or attempt to recruit members from this server. \n 6—Discord Terms of Service  —> https://discord.com/guidelines \n Violation of the Discord ToS in any way, shape or form will result in you getting kicked from our server, such violations are distributing malicious, pirated or illegal content, websites or software or not meeting the age requirement of 13. \n 7-While our staff have a general guideline to follow,they do reserve the right to moderate at own discretion, regardless of any rule listed above please do not intervene while staff members are doing their job. \n 8-don't ping the staff without any genuine reason.", ['🆗', '📜' ] )

})

client.login(config.token)
