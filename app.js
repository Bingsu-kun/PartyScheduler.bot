import Bolt from '@slack/bolt';
import dotenv from 'dotenv'
import oauth from '@slack/oauth'

import dbconnect from './src/config/DBConnection.js'
import question from './src/controller/QuestionController.js';
import { openModal, reply } from './src/controller/ReplyShortcutController.js';
import { teamFind, channelFind, messageFind, commentFind } from './src/service/DataAccessService.js';


dotenv.config();

const app = new Bolt.App({
  signingSecret: process.env.SIGNING_SECRET,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  stateSecret: 'whoareyou',
  scopes: ["commands","chat:write","chat:write.public","channels:read","channels:join"],
  installationStore: oauth.FileInstallationStore(),
  // token: process.env.TOKEN,
  appToken: process.env.APPTOKEN,
  socketMode: true,
  port: process.env.PORT,
  customRoutes: [{
    path: '/health-check',
    method: 'GET',
    handler: (req, res) => {
      res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
      res.end('Anony4Questioner 앱이 동작 중 입니다.');
    }
  },
  {
    path: '/teams',
    method: 'GET',
    handler: (req, res) => {
      res.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'});
      teamFind().then((value) => {
        const result = JSON.stringify(value);
        res.write(result);
        res.end();
      })
    }
  },
  {
    path: '/channels',
    method: 'GET',
    handler: (req, res) => {
      res.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'});
      channelFind().then((value) => {
        const result = JSON.stringify(value);
        res.write(result);
        res.end();
      })
    }
  },
  {
    path: '/messages',
    method: 'GET',
    handler: (req, res) => {
      res.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'});
      messageFind().then((value) => {
        const result = JSON.stringify(value);
        res.write(result);
        res.end();
      })
    }
  },
  {
    path: '/comments',
    method: 'GET',
    handler: (req, res) => {
      res.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'});
      commentFind().then((value) => {
        const result = JSON.stringify(value);
        res.write(result);
        res.end();
      })
    }
  },
]
});

try {
  dbconnect();
} catch (error) {
  console.log('DB Connet Faild. Cause : ' + error);
}


(async () => {
  await app.start();

  console.log(`a4q bot is running on ${process.env.PORT} port`);
})();

app.command('/a4q', question);

// openModal, reply 두 메서드 워크플로로 묶기, openModal 메서드 리턴값으로 reply에 전달 (ReplyShortcutController 함수형으로)
app.shortcut('reply_on_thread', openModal);
app.view('reply_anonymously', reply)