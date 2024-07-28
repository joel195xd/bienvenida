const { goodbyeImage } = require('discord-welcome-card');
const { MessageAttachment, CommandInteraction } = require('discord.js')

module.exports = {
    name: 'goodbye',
    args: false,
    description: 'Shows you the goodbye card',
    commands: ['goodbye'],

    /**
     *@document
     * @this
     * @param {CommandInteraction} msg 
     * @param {String[]} args 
     */
    async execute(msg) {
        const image = await goodbyeImage(msg.member, { theme: "code" });
        msg.reply({ files: [new MessageAttachment(image, 'welcome.png')] })
    }
};