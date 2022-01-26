import IncomingMessage from '../model/Message.js';
import { save } from '../service/MessageService.js';

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

  save(IncomingMessage(command.team_id, command.team_domain, command.channel_id, 
    command.channel_name, command.user_name, command.text));

};