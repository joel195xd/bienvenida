//define the libraries
const Discord = require("discord.js");
const express = require('express');
const client = new Discord.Client();
const config = require("./config.json");

// Configura Express para mantener el servicio activo
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

//when its ready log it
client.on("ready", ()=>console.log("READY"));
//define welcome "package"
const welcome = require("./welcome");
welcome(client);
//start the bot
client.login(process.env.TOKEN);
