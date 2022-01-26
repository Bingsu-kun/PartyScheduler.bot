export default (team_id, team_domain, channel_id, channel_name, ts, user_name, text) => {
  return { 
    team_id: team_id,
    team_domain: team_domain,
    channel_id: channel_id,
    channel_name: channel_name,
    ts: ts,
    user_name: user_name,
    text: text,
    date: Date.now(),
  }
}