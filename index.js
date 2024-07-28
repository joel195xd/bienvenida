// define the libraries
const Discord = require("discord.js");
const express = require("express");
const client = new Discord.Client();
const config = require("./config.json");
require('dotenv').config(); // Asegúrate de que dotenv esté configurado correctamente


// create an instance of express
const app = express();
const port = 3000; // choose a port for the express server

// when the bot is ready
client.on("ready", () => console.log("READY"));

// define welcome "package"
const welcome = require("./welcome");
welcome(client);

// start the bot
client.login(config.TOKEN);

// create a simple express route
app.get("/", (req, res) => {
  res.send("Hello from the Express server!");
});

// start the express server
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
