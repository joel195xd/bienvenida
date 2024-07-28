[![NPM Version](https://img.shields.io/npm/v/@discord-card/greeting?color=00DEC8&style=for-the-badge)](https://www.npmjs.com/package/@discord-card/greeting)
[![NPM Downloads](https://img.shields.io/npm/dt/@discord-card/greeting?color=00DEC8&style=for-the-badge)](https://www.npmjs.com/package/@discord-card/greeting)
[![NPM License](https://img.shields.io/npm/l/@discord-card/greeting?color=00DEC8&style=for-the-badge)](https://www.npmjs.com/package/@discord-card/greeting)
[![Github Size](https://img.shields.io/github/repo-size/discord-card/greeting?color=00DEC8&label=SIZE&style=for-the-badge)](https://www.npmjs.com/package/@discord-card/greeting)

# Discord-Welcome-Card Example Bot V13

Exmaple Bot for [discord-welcome-card](https://www.npmjs.com/package/discord-welcome-card) [package](https://github.com/discord-card) in discord.js V13

# Setup

.env file

```
TOKEN=YOUR_DISCORD_BOT_TOKEN
```

**[![widget](https://discord.com/api/guilds/553942677117337600/widget.png?style=banner2)](https://discord.gg/Emk2udJ)**

# Create Custom Cards

```JS
const { MessageAttachment } = require('discord.js')

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

interaction.reply({ files: [new MessageAttachment(image, 'welcome.png')] })


```
