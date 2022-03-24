import { GoogleSpreadsheet } from 'google-spreadsheet';
import dotenv from 'dotenv'
import KorDate from '../utils/KorDate'

dotenv.config()

const doc = new GoogleSpreadsheet('1WvqtIaRkJPJ4kKu8mfOzsX08YpxUwuAoIToXN9p8ePQ');
await doc.useServiceAccountAuth({
  client_email: process.env.GOOGLE_APIEMAIL,
  private_key: process.env.GOOGLE_APIKEY.replace(/\\n/g, "\n")
})
await doc.loadInfo();
const sheet = doc.sheetsByTitle['질문']
await sheet.loadHeaderRow()

export default async ({ command, ack, say, text }) => {

  try {

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
  } catch (error) {
    console.log("error occurred while sending message. Cause : " + error)
  }

  try {
    await sheet.addRow({ 
      date: KorDate(),
      team_id: command.team_id, 
      team_name: command.team_domain,
      channel_id: command.channel_id, 
      channel_name: command.channel_name,
      user_name: command.user_name,
      text: command.text
    })
  } catch (error) {
    console.log("Error on saving message. Cause : "+error)
  }

};