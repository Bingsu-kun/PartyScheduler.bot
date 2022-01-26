import Bolt from '@slack/bolt';
import dotenv from 'dotenv'

import dbconnect from './src/config/DBConnection.js'
import question from './src/controller/QuestionController.js';
import { openModal, reply } from './src/controller/ReplyShortcutController.js';


dotenv.config();

const app = new Bolt.App({
  signingSecret: process.env.SIGNING_SECRET,
  token: process.env.TOKEN,
  appToken: process.env.APPTOKEN,
  socketMode: true,
  port: process.env.PORT
});

dbconnect();

(async () => {
  await app.start();

  console.log(`a4q bot is running on ${process.env.PORT} port`);
})();

app.command('/a4q', question);

// openModal, reply 두 메서드 워크플로로 묶기, openModal 메서드 리턴값으로 reply에 전달 (ReplyShortcutController 함수형으로)
app.shortcut('reply_on_thread', openModal);
app.view('reply_anonymously', reply)