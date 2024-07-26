const config = require("./config");
const Canvas = require("canvas");
const Discord = require("discord.js");
const path = require("path");

module.exports = function (client) {
    const description = {
        name: "WelcomeImages",
        filename: "welcome.js",
        version: "4.8"
    };

    console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`);

    client.on("guildMemberAdd", async member => {
        if (!member.guild) return;

        const canvas = Canvas.createCanvas(3840, 2160);
        const ctx = canvas.getContext('2d');

        // Load the Tak Cubit font
        Canvas.registerFont(path.join(__dirname, 'SuperBoys.ttf'), { family: 'Super Boys' });

        const background = await Canvas.loadImage(`./welcome.png`);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#ffffff'; // Border color
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // Draw the circular mask for the avatar
        ctx.save();
        ctx.beginPath();
        const avatarX = canvas.width / 2;
        const avatarY = 800;
        const avatarSize = 600; // Size of the avatar
        ctx.arc(avatarX, avatarY, avatarSize / 2 + 10, 0, Math.PI * 2, true); // Circle with extra radius for border
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, avatarX - avatarSize / 2, avatarY - avatarSize / 2, avatarSize, avatarSize);

        ctx.restore();

        // Draw the white border around the avatar
        ctx.lineWidth = 20;
        ctx.strokeStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(avatarX, avatarY, avatarSize / 2 + 10, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();

        // Draw the username
        ctx.font = 'normal 200px Tak Cubit'; // Use Tak Cubit font
        ctx.fillStyle = '#ffffff'; // White color for the text
        ctx.strokeStyle = '#000000'; // Black border for the text
        ctx.lineWidth = 10;
        ctx.textAlign = 'center';
        const username = `${member.user.username}`;
        ctx.strokeText(username, canvas.width / 2, 1500);
        ctx.fillText(username, canvas.width / 2, 1500);

        // Draw the ETERIA ID
        ctx.font = 'normal 150px Tak Cubit'; // Use Tak Cubit font
        const memberCountText = `ETERIA ID #${member.guild.memberCount}`;
        ctx.strokeText(memberCountText, canvas.width / 2, 1700);
        ctx.fillText(memberCountText, canvas.width / 2, 1700);

        // Generate the image
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

        // Create and send the welcome embed
        const welcomeembed = new Discord.MessageEmbed()
            .setColor("#ffffff") // White color for the embed
            .setTimestamp()
            .setFooter("¡Bienvenido!", member.guild.iconURL({ dynamic: true }))
            .setDescription(`Hey <@${member.id}>, you better have your Patreon and Discord account linked in the Patreon settings to get your damn role and thus have access to the exclusive channels and extra rewards`)
            .setImage("attachment://welcome-image.png")
            .attachFiles(attachment);

        const channel = member.guild.channels.cache.find(ch => ch.id === config.CHANNEL_WELCOME);
        channel.send(welcomeembed);

        let roles = config.ROLES_WELCOME;
        for (let i = 0; i < roles.length; i++)
            member.roles.add(roles[i]);
    });
};

// Coded by Tomato#6966!
