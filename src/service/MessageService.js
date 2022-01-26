import mongoose from 'mongoose';

import { team_schema, channel_schema, message_schema } from '../Schemas.js';

const teamModel = new mongoose.model("teams", team_schema);
const channelModel = new mongoose.model("channels", channel_schema);
const messageModel = new mongoose.model("messages", message_schema);

function save(incomingMessage) {
  const team = new teamModel({
    team_id: incomingMessage.team_id,
    team_domain: incomingMessage.team_domain
  })

  const channel = new channelModel({
    channel_id: incomingMessage.channel_id,
    channel_name: incomingMessage.channel_name
  })

  const message = new messageModel({
    team_id: incomingMessage.team_id,
    channel_id: incomingMessage.channel_id,
    user_name: incomingMessage.user_name,
    text: incomingMessage.text,
    date: Date.now()
  })

  team.save()
    .then(() => {
      console.log('team saved!');
    })
    .catch((error) => {
      console.log('error on team saving : ' + error);
    })

  channel.save()
  .then(() => {
    console.log('channel saved!');
  })
  .catch((error) => {
    console.log('error on channel saving : ' + error);
  })

  message.save()
  .then(() => {
    console.log('message saved!');
  })
  .catch((error) => {
    console.log('error on message saving : ' + error);
  })

}

function teamFind() {
  teamModel.find({});
}

function channelFind() {
  channelModel.find({});
}

function messageFind() {
  messageModel.find({});
}

export {
  save,
  teamFind,
  channelFind,
  messageFind
};