import { REST, Routes } from 'discord.js';

const commands = [
  {
    name: 'answer',
    description: 'get reply for query!',
  },
];

//commenting bcz of security issue while pushing on github
// const token='DISCORD TOKEN FROM DEV PORTAL OF DISCORD';
// const client='DISCORD CLIENT';


const rest = new REST({ version: '10' }).setToken(token);
try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(client), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}