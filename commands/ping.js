const { SlashCommandBuilder } = require("discord.js");
//comando de ping pong o hello word dos bots dos ds
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Responde com pong!"),
    async execute(interaction) {
        await interaction.reply("pong");
    },
};