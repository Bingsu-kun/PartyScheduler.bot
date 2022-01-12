import publishMessage from '../utils/PublishMessage.js';
import { client, token } from '../../config.js';

export default (req, res) => {

  // 슬랙에서 보내온 페이로드를 통해 channel_Id와 텍스트를 받아옵니다.
  // 단순히 다시 메세지를 포스트 할 수 있도록 반환합니다. 
  publishMessage(client, token, req.body.channel_id, req.body.text)
  .then((result) => {
    console.log(result);
    // send로 보내면 나만보기로 표시됨.
    res.send('성공적으로 익명처리 되었어요. (ㅇㅅㅇ)b');
  })
  .catch((error) => {
    console.error(error);
    res.send('에러가 발생해서 메세지를 띄우지 않았어요... (ㅠㅅㅠ)');
  });
  
}
