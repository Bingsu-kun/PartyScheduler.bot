export default async ({ command, ack, say }) => {
  await ack();

  console.log(command)

  await say({
    blocks: [{
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": command.text
      }
    }]
  })
};