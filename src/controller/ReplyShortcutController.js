import IncommingComment from '../model/Comment.js';
import { saveComment } from '../service/DataAccessService.js';

const comment = IncommingComment('','','','','','','');

// The open_modal shortcut opens a plain old modal
export const openModal = async ({ shortcut, ack, client, logger }) => {

  try {
    // Acknowledge shortcut request
    await ack();

    // Call the views.open method using one of the built-in WebClients
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
              text: "제가 익명으로 전달해 드릴게요! (+ㅅ+)"
            },
            element: {
              type: "plain_text_input",
              action_id: "reply_text",
              placeholder: {
                type: "plain_text",
                text: "여기에 적어주세요"
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
    saveComment(comment);
  } catch (error) {
    console.log('error on saving comment. Cause : ' + error)
  }
}