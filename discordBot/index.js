import { Client, GatewayIntentBits } from 'discord.js';
import run from './gemini.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMessages] });


client.on('messageCreate',async (message)=>{
    // console.log(message);
    // console.log(message.content);

    if(message.author.bot) return;
    let ans= await run(message.content)

    // console.log(ans);
     message.reply({
        content:ans,
    })
})


client.on('interactionCreate', async interaction => {
    console.log(interaction)
      await interaction.reply('Pong!');
  });
//commenting bcz of security issue while pushing on github
//client.login('DISCORD LOGIN ID');