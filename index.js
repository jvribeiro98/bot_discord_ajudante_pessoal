// Exigir as classes discord.js necessárias
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

// dotenv trás as informações colocadas em env
const dotenv= require('dotenv')
dotenv.config()
const{ TOKEN, CLIENT_ID, GUILD_ID } = process.env

// importação dos comandos
const fs = require("node:fs")
const path = require("node:path")

//trás todos os comandos terminados em .js
const commandsPath = path.join(__dirname,"commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

// Criar uma nova instância de cliente
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()
//envia os comandos para o bot 
for (const file of commandFiles){
	const filePath = path.join (commandsPath, file)
	const command = require (filePath)
	if ("data" in command && "execute" in command){
		client.commands.set(command.data.name, command)
	} else {
		console.log(`Esse comando em ${filePath} está com "data" ou "execute" ausentes.`)
	}
}

// Quando o cliente estiver pronto, execute este código (apenas uma vez)
// Usamos 'c' para o parâmetro do evento para mantê-lo separado do 'cliente' já definido
client.once(Events.ClientReady, c => {
	console.log(`Pronto! login realizado com sucesso. ${c.user.tag}`);
});

// Faça login no Discord com o token do seu cliente
client.login(TOKEN);

//interação com o bot
client.on(Events.InteractionCreate, async intercation =>{
	if (!intercation.isChatInputCommand() ) return
	const command = intercation.client.commands.get(intercation.commandName)
	if(!command){
		console.error("comando não encontrado")
		return
	}
	try{
		await command.execute(intercation)
	}catch (error) {
		console.error(error)
		await intercation.reply("Houve um erro ao excultar esse comando")
	}

}) 