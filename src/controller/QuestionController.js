import IncomingMessage from '../model/Message.js';
import { saveMessage } from '../service/DataAccessService.js';

export default async ({ command, ack, say }) => {
  await ack();

  await say({
    blocks: [{
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": command.text
      }
    }]
  })

  saveMessage(IncomingMessage(command.team_id, command.team_domain, command.channel_id, 
    command.channel_name, command.user_name, command.text));

};