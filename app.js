import Bolt from '@slack/bolt';
import dotenv from 'dotenv'
import https from 'https'

import dbconnect from './src/config/DBConnection.js'
import question from './src/controller/QuestionController.js';
import { openModal, reply } from './src/controller/ReplyShortcutController.js';
import { teamFind, channelFind, messageFind, commentFind, saveAuth, findAuth } from './src/service/DataAccessService.js';

// .env 파일의 설정을 환경 변수에 등록
dotenv.config();


const app = new Bolt.App({
  signingSecret: process.env.SIGNING_SECRET,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  stateSecret: 'whoareyou',
  scopes: ["commands","chat:write","channels:read","channels:join"],
  installationStore: {
    // 새로 등록된 팀,채널이 OAuth2.0 인증을 할 경우 이 메서드를 통해서 auth 정보가 저장됩니다. 
    storeInstallation: async (installation) => {
      const saved = await saveAuth(installation)
      return saved
    },
    // 앱이 호출될 때 마다 이 팀,채널이 인증되어 있는지 확인하는 메서드입니다. 
    fetchInstallation: async (installQuery) => {
      const found = await findAuth(installQuery)
      return found
    }
  },
  // 특정 팀에서만 사용하는 것이 아닌 여러 팀에서 사용하게 할 경우 token 값은 필요없습니다. (채널의 token이기 때문)
  // 추가될 경우 에러를 일으킵니다.
  // token: process.env.TOKEN,
  appToken: process.env.APPTOKEN,
  socketMode: true,
  port: process.env.PORT,
  customRoutes: [
  {// 앱 구동 확인을 위한 메서드
    path: '/health-check',
    method: 'GET',
    handler: (req, res) => {
      res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
      res.end('Anony4Questioner 앱이 동작 중 입니다.');
    }
  },
  {// 모든 팀 정보 반환
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
  {// 모든 채널 정보 반환
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
  {// 모든 메세지 정보 반환
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
  {// 모든 코멘트 정보 반환
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

// db 연결
try {
  dbconnect();
} catch (error) {
  console.log('DB Connet Faild. Cause : ' + error);
}

// 앱 구동
(async () => {
  await app.start();

  console.log(`owlnonymous bot is running on ${process.env.PORT} port`);

  setInterval(() => {
    https.get("https://anony4questioner.herokuapp.com/health-check")
  },60000)
})();

// /owl 커맨드 등록. /owl 커맨드 사용시 이 메서드 실행
app.command('/owl', question);

// 숏컷 클릭시 이 메서드 실행
app.shortcut('reply_on_thread', openModal);
// 모달에서 받아온 텍스트를 해당 메세지의 답글로 달아주는 메서드.
app.view('reply_anonymously', reply)

process.on('uncaughtException', (error) => {
  console.log('에상치 못한 에러가 발생했습니다. Cause : ' + error)
})
