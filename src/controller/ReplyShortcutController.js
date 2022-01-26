let teamId = ''
let teamDomain = ''
let channelId = ''
let channelName = ''
let ts = ''
let userName = ''

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

    teamId = shortcut.team.id;
    teamDomain = shortcut.team.domain;
    channelId = shortcut.channel.id;
    channelName = shortcut.channel.name;
    userName = shortcut.user.name;
    ts = shortcut.message_ts;
  }
  catch (error) {
    logger.error(error);
  }
  
};

export const reply = async ({ ack,  view, client }) => {
  await ack();

  console.log(view)
  
  try {
    const response = await client.chat.postMessage({
      channel: channelName,
      thread_ts: ts,
      text: view.state.values.replyInput.reply_text.value
    })

    console.log(response);
  } catch (error) {
    console.log(error)
  }
}