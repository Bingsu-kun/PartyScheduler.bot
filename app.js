import { WebClient, LogLevel } from '@slack/web-api';
import { token } from './config.js';
import express from 'express';
import route from './src/route.js';

const client = new WebClient(token, {
  logLevel: LogLevel.DEBUG
});

const app = express();
const port = 3000;

app.use(route);

app.listen(port, () => {
  console.log(`테스트 앱 구동 완료. url => http://localhost:${port}`)
});