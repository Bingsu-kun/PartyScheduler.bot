// 필수적인 라이브러리를 import 합니다
import { Client, Intents } from 'discord.js';
import { token } from '../config.js'; 

// 새로운 클라이언트 인스턴스를 만듭니다.
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// 클라이언트가 준비되면 이 코드를 실행합니다. (한 번만) 
client.once('ready', () => {
  console.log('Ready!');
});

console.log();

// 클라이언트 토큰을 이용해 디스코드에 로그인합니다.
client.login(token);
