import express from 'express';
import router from './src/Router.js';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// post 요청시 json 방식, www-form-urlencorded 방식으로 받아들이기 위한 body-parser 이용
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
  console.log(`테스트 앱 구동 완료. url => http://localhost:${port}`)
});
