import { GoogleSpreadsheet } from 'google-spreadsheet';
import dotenv from 'dotenv'

dotenv.config()

const doc = new GoogleSpreadsheet('1WvqtIaRkJPJ4kKu8mfOzsX08YpxUwuAoIToXN9p8ePQ');
await doc.useServiceAccountAuth({
  client_email: process.env.GOOGLE_APIEMAIL,
  private_key: process.env.GOOGLE_APIKEY.replace(/\\n/g, "\n")
})
await doc.loadInfo();
const sheet = doc.sheetsByTitle['답글']
await sheet.loadHeaderRow()

const comment = {
  team_id: String,
  team_domain: String,
  channel_id: String,
  channel_name: String,
  ts: String,
  user_name: String,
  text: String
}

// openModal 메서드로 모달을 띄워줍니다.
export const openModal = async ({ shortcut, ack, client, logger }) => {

  try {
    // ack를 통해 통신 가능함을 클라이언트에게 알려줍니다.
    await ack();

    // 클라이언트의 views.open 메서드를 통해 모달을 띄워줍니다.
    const result = await client.views.open({
      trigger_id: shortcut.trigger_id,
      view: {
        type: "modal",
        callback_id: "reply_anonymously",
        title: {
          type: "plain_text",
          text: "익명으로 스레드에 답글달기"
        },
        close: {
          type: "plain_text",
          text: "닫기"
        },
        submit: {
          type: "plain_text",
          text: "전송"
        },
        blocks: [
          {
            type: "input",
            block_id: "replyInput",
            label: {
              type: "plain_text",
              text: "제가 익명으로 전달해 드릴게요! 🦉"
            },
            element: {
              type: "plain_text_input",
              action_id: "reply_text",
              placeholder: {
                type: "plain_text",
                text: "여기에 질문을 적어주세요"
              },
              multiline: true
            }
          }
        ]
      }
    });

    comment.team_id = shortcut.team.id;
    comment.team_domain = shortcut.team.domain;
    comment.channel_id = shortcut.channel.id;
    comment.channel_name = shortcut.channel.name;
    comment.user_name = shortcut.user.name;
    comment.ts = shortcut.message_ts;
  }
  catch (error) {
    logger.error(error);
  }
  
};

export const reply = async ({ ack, view, client, text }) => {
  await ack();

  const textInView = view.state.values.replyInput.reply_text.value;

  comment.text = textInView;
  
  try {
    const response = await client.chat.postMessage({
      channel: comment.channel_name,
      thread_ts: comment.ts,
      text: textInView
    })
  } catch (error) {
    console.log('error on replying to slack. Cause : ' + error)
  }

  try {
    await sheet.addRow({
      date: Date.now(),
      team_id: comment.team_id,
      team_name: comment.team_domain,
      channel_id: comment.channel_id,
      channel_name: comment.channel_name,
      ts: comment.ts,
      user_name: comment.user_name,
      text: comment.text
    })
  } catch (error) {
    console.log('error on saving comment. Cause : ' + error)
  }
}