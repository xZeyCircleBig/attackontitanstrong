const Discord = require('discord.js');
const client = new Discord.Client();
let prefix = "?"
 
client.login('NjE0NzYwNDg4NzQzNjAwMTI4.XWEK0A.po-mosVcrr_kTu41-jvrbbu2ff4');
 


 
/*Kick*/
client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + 'kick') {
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("You do not have permission to use this command ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Please mention a user :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("You can't kick this user :x:")
       if (!member.kickable) return message.channel.send("I can't kick this user :sunglass:")
       member.kick()
       message.channel.send('**' + member.user.username + '** has been kick :white_check_mark:')
    }
})
 
/*Ban*/
client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban') {
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("You do not have permission to use this command ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Please mention a user :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("You can't ban this user :x:")
       if (!member.bannable) return message.channel.send("I can't ban this user :sunglass:")
       message.guild.ban(member, {days: 7})
       message.channel.send('**' + member.user.username + '** has been banned :white_check_mark:')
    }
})


client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You do not have permission to use this command")
        let count = parseInt(args[1])
        if (!count) return message.channel.send("Please indicate a number of messages to be deleted")
        if (isNaN(count)) return message.channel.send("Please indicate a valid number")
        if (count < 1 || count > 500) return message.channel.send("Please indicate a number between 1 and 500")
        message.channel.bulkDelete(count + 1, true)
    }
 
    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You do not have permission to use this command")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("User not found")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("You can't mute this user")
        if (!member.manageable) return message.channel.send("I can't mute this user")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' has been muted :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then(function (role) {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(function (channel) {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' has been muted :white_check_mark:')
            })
        }
    }
})
client.on("message", function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    //unmute
    if (args[0].toLowerCase() === prefix + "unmute") {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You do not have permission to use this command.")
        let member = message.mentions.members.first()
        if(!member) return message.channel.send("User not found")
        if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("You can't unmute this user.")
        if(!member.manageable) return message.channel.send("I can't unmute this user.")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if(muterole && member.roles.has(muterole.id)) member.removeRole(muterole)
        message.channel.send(member + ' has been unmuted :white_check_mark:')
    }
})
client.on('ready', function () {
    console.log('Bot connected')
    client.user.setActivity('Keeping humanity safe', {type: "PLAYING"})
})
