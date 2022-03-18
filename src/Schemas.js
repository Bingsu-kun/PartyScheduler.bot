import mongoose from 'mongoose';

const team_schema = new mongoose.Schema({
  team_id: { type: String, required: true, unique: true },
  team_domain: { type: String, required: true }
})

const channel_schema = new mongoose.Schema({
  channel_id: { type: String, required: true, unique: true },
  channel_name: { type: String, required: true }
})

const message_schema = new mongoose.Schema({
  team_id: { type: String, required: true },
  channel_id: { type: String, required: true },
  user_name: { type: String, required: true },
  text: { type: String },
  date: { type: Date, default: Date.now(), required: true }
})

const comment_schema = new mongoose.Schema({
  team_id: { type: String, required: true },
  channel_id: { type: String, required: true },
  ts: { type: String, required: true },
  user_name: { type: String, required: true },
  text: { type: String },
  date: { type: Date, default: Date.now(), required: true }
})

const auth_schema = new mongoose.Schema({
  team: { id: { type: String }, name: { type: String } },
  enterprise: { type: String },
  user: { token: { type: String }, scope: { type: String }, id: { type: String } },
  tokenType: { type: String },
  isEnterpriseInstall: { type: Boolean },
  appId: { type: String },
  authVersion: { type: String },
  bot: {
    scopes: [ { type: String } ],
    token: { type: String },
    userId: { type: String },
    id: { type: String },
  }
})

export { team_schema, channel_schema, message_schema, comment_schema, auth_schema };
