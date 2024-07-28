const { welcomeImage } = require('discord-welcome-card');
const { MessageAttachment, CommandInteraction } = require('discord.js')

module.exports = {
    name: 'Welcome',
    args: false,
    description: 'Shows you the welcome card',
    commands: ['welcome'],

    /**
     *@document
     * @this
     * @param {CommandInteraction} msg 
     * @param {String[]} args 
     */
    async execute(msg) {
        const image = await welcomeImage(msg.member);
        msg.reply({ files: [new MessageAttachment(image, 'welcome.png')] })
    }
};