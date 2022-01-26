export default (team_id, team_domain, channel_id, channel_name, user_name, text) => {
  return { 
    team_id: team_id,
    team_domain: team_domain,
    channel_id: channel_id,
    channel_name: channel_name,
    user_name: user_name,
    text: text,
    date: Date.now(),
  }
}