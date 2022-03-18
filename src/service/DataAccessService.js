import mongoose from 'mongoose';

import { team_schema, channel_schema, message_schema, comment_schema, auth_schema } from '../Schemas.js';

const teamModel = new mongoose.model("teams", team_schema);
const channelModel = new mongoose.model("channels", channel_schema);
const messageModel = new mongoose.model("messages", message_schema);
const commentModel = new mongoose.model("comments", comment_schema);
const authModel = new mongoose.model("auths", auth_schema);

function saveAuth(installation) {
  const auth = new authModel(installation)

  auth.save()
    .then(() => {
      console.log('auth saved!');
    })
    .catch((error) => {
      console.log('error on auth saving : ' + error);
    })
  
  return auth
}

async function findAuth(installQuery) {
  const query = await authModel.findOne({ team: { id: installQuery.teamId } }, (err,doc) => {
    return doc || err
  })
}

function saveMessage(incomingMessage) {
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

function saveComment(incomingComment) {
  const team = new teamModel({
    team_id: incomingComment.team_id,
    team_domain: incomingComment.team_domain
  })

  const channel = new channelModel({
    channel_id: incomingComment.channel_id,
    channel_name: incomingComment.channel_name
  })

  const comment = new commentModel({
    team_id: incomingComment.team_id,
    channel_id: incomingComment.channel_id,
    ts: incomingComment.ts,
    user_name: incomingComment.user_name,
    text: incomingComment.text,
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

  comment.save()
  .then(() => {
    console.log('comment saved!');
  })
  .catch((error) => {
    console.log('error on comment saving : ' + error);
  })

}

async function teamFind() {
  const query = teamModel.find();
  return await query
}

async function channelFind() {
  const query = channelModel.find();
  return await query
}

async function messageFind() {
  const query = messageModel.find();
  return await query
}

async function commentFind() {
  const query = commentModel.find();
  return await query
}

export {
  saveMessage,
  saveComment,
  teamFind,
  channelFind,
  messageFind,
  commentFind,
  saveAuth,
  findAuth
};