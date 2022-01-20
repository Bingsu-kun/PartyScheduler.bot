import { signing_secret, token, appToken } from './config.js';
import Bolt from '@slack/bolt';

import question from './controller/QuestionController.js';
import { openModal, reply } from './controller/ReplyShortcutController.js';

const app = new Bolt.App({
  signingSecret: signing_secret,
  token: token,
  appToken: appToken,
  socketMode: true,
  port: 3000
});

(async () => {
  await app.start();

  console.log(`a4q bot is running on 3000 port`);
})();

app.command('/a4q', question);

app.shortcut('reply_on_thread', openModal);

app.view('reply_anonymously', reply)