const { drawCard, Gradient } = require('discord-welcome-card');
const { MessageAttachment, CommandInteraction } = require('discord.js')

module.exports = {
    name: 'custom',
    args: false,
    description: 'Shows you a custom card',
    commands: ['custom'],

    /**
     *@document
     * @this
     * @param {CommandInteraction} msg 
     * @param {String[]} args 
     */
    async execute(msg) {
        const image = await drawCard({

            avatar: msg.user.avatarURL({ format: 'png' }),
            blur: true,
            rounded: true,
            text: "Some text",
            subtitle: "Pigeon subtitle",
            theme: {
                image: "./commands/image.png",
                color: new Gradient("linear", {
                    color: "#4287f5",
                    offset: 1
                }, {
                    color: "#f5426f",
                    offset: 0
                })
            }

        });
        msg.reply({ files: [new MessageAttachment(image, 'welcome.png')] })
    }
};